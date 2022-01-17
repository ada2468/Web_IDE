import { v4 as uuidv4 } from 'uuid';

export interface fileSystemFileNode {
    id: string,
    handle: FileSystemHandle,
    ancestor?: fileSystemNode,
}

export interface fileSystemDirectoryNode extends fileSystemFileNode {
    children: fileSystemTree,
}

export type fileSystemNode = fileSystemDirectoryNode | fileSystemFileNode;
export type fileSystemTree = fileSystemNode[];
export interface searchTable {
    [id: string]: fileSystemNode | string,
    rootId?: string,
}

export interface fileTable {
    [id: string]: FileSystemFileHandle | null,
}

class FileSystem {
    #fileSystemTree: fileSystemTree = [];
    #rootHandler: FileSystemDirectoryHandle;
    #fileTable: fileTable = {};
    #searchTable: searchTable = {};
    static #instance: FileSystem;

    constructor() {
        //singleton pattern
        if (FileSystem.#instance) {
            return FileSystem.#instance;
        }
        FileSystem.#instance = this;
    }

    //Private Methods
    #compareFileSystemTree: (first: fileSystemNode, second: fileSystemNode) => number = (first, second) => {
        if (first.handle.kind !== second.handle.kind) {
            return first.handle.kind === "directory" ? -1 : 1
        } else {
            let compA = first.handle.name.toLocaleLowerCase();
            let compB = second.handle.name.toLocaleLowerCase();
            return compA.localeCompare(compB) > 0 ? -1 : 1
        }
    }

    #setRootHandler = (rootHandler: FileSystemDirectoryHandle) => { this.#rootHandler = rootHandler }

    #recursiveScanFolder = async (
        ancestor: fileSystemDirectoryNode
    ) => {
        let node: fileSystemNode;
        let uuid: string;

        const dirHandle = ancestor.handle as FileSystemDirectoryHandle;
        try {
            const entries = dirHandle.entries();
            for await (let [name, handle] of entries) {
                uuid = uuidv4();

                if (handle.kind === "directory") {
                    node = {
                        handle: handle,
                        id: uuid,
                        ancestor: ancestor,
                        children: []
                    }
                    await this.#recursiveScanFolder.call(this, node);
                } else {
                    node = {
                        handle: handle,
                        id: uuid,
                        ancestor: ancestor,
                    }
                }
                ancestor['children'].push(node);
                ancestor['children'].sort(this.#compareFileSystemTree);
                this.#searchTable[uuid] = node;
            }
        } catch {
            //console.log(dirHandle)
        }
        return ancestor;
    };

    //only for finding file
    #findNodeFromPath(path: Array<string>, fileSystemTree: fileSystemTree) {
        if (!path) { return null }
        let fileName = path.pop();
        let treeNode = fileSystemTree[0] as fileSystemDirectoryNode;
        let folderHandler: fileSystemNode | undefined;
        for (let folderName of path) {
            folderHandler = treeNode.children.find(node => node.handle.kind === "directory" && node.handle.name === folderName)
            if (folderHandler) {
                treeNode = folderHandler as fileSystemDirectoryNode;
            }
            else { return null; }
        }
        let fileHandler = treeNode.children.find(node => node.handle.kind === "file" && node.handle.name === fileName);
        if (fileHandler) { return fileHandler }
        else { return null }
    }

    async #removeRepeatedFilesOpened(handlers: Array<FileSystemFileHandle>, fileTable: fileTable) {
        if (Object.keys(fileTable).length === 0) return handlers;
        let editorfileHandlerArray: Array<FileSystemFileHandle> = Object.values(fileTable).filter(file => file);
        let clearedHandlers: Array<FileSystemFileHandle> = [];
        for (let handler of handlers) {
            let repeated: boolean = false;
            for (let editorFileHandler of editorfileHandlerArray) {
                let isSameEntry: boolean = await editorFileHandler.isSameEntry(handler)
                if (isSameEntry) {
                    repeated = true;
                    break;
                }
            }
            if (!repeated) clearedHandlers.push(handler);
        }
        return clearedHandlers;
    }

    //Public Methods
    getfileSystemTree() {
        return this.#fileSystemTree;
    }
    getSearchTable() {
        return this.#searchTable;
    }
    getfileTable() {
        return this.#fileTable;
    }
    getRootHandler() {
        return this.#rootHandler;
    }

    idToFileHandler(id: string) {
        if (this.#fileTable[id]) return this.#fileTable[id];
        if (this.#searchTable[id]) {
            const fileNode = this.#searchTable[id] as fileSystemNode;
            return fileNode.handle;
        }
        return null;
    }

    createNewFilePlaceHolder() {
        const id = uuidv4();
        this.#fileTable[id] = null;
        return id;
    }

    async importFolder() {
        this.#fileSystemTree = [];
        this.#searchTable = {};
        const rootNode: fileSystemNode = {
            handle: this.#rootHandler,
            id: uuidv4(),
            children: []
        }
        this.#searchTable[rootNode.id] = rootNode;
        this.#searchTable['rootId'] = rootNode.id;
        await this.#recursiveScanFolder.call(this, rootNode);
        this.#fileSystemTree.push(rootNode);
    }

    async getFileInfo(fileHandlers: Array<FileSystemFileHandle>, ids?: Array<string>) {
        const fileInfoArray: Array<{ name: string, id: string, content: string, type: "standalone" | "folder" }> = [];
        fileHandlers = await this.#removeRepeatedFilesOpened(fileHandlers, this.#fileTable)
        if (!ids || ids.length !== fileHandlers.length) {
            for (let fileHandler of fileHandlers) {
                let file = await fileHandler.getFile();
                let content = await file.text();
                let path = await this.#rootHandler?.resolve(fileHandler);
                let uuid: string;
                if (path) {
                    let fileNode = this.#findNodeFromPath(path, this.#fileSystemTree);
                    uuid = fileNode.id;
                    fileInfoArray.push({
                        name: fileHandler.name,
                        content: content,
                        type: "folder",
                        id: uuid
                    })
                } else {
                    uuid = uuidv4();
                    fileInfoArray.push({
                        name: fileHandler.name,
                        content: content,
                        type: "standalone",
                        id: uuid
                    })
                }
                this.#fileTable[uuid] = fileHandler;
            }
        }
        else {
            for (let i = 0; i < fileHandlers.length; i++) {
                let file = await fileHandlers[i].getFile();
                let content = await file.text();
                let uuid = ids[i]
                fileInfoArray.push({
                    name: fileHandlers[i].name,
                    content: content,
                    type: "folder",
                    id: uuid
                })
                this.#fileTable[uuid] = fileHandlers[i];
            }
        }
        return fileInfoArray;
    }

    removeFileFromFileTable(id:string){
        delete this.#fileTable[id];
    }

    async getSaveHandlersInfo(fileHandlers: Array<FileSystemFileHandle>) {
        const fileInfoArray: Array<{ name: string, id: string, type: "standalone" | "folder" | "new" }> = [];
        for (let fileHandler of fileHandlers) {
            let path = await this.#rootHandler.resolve(fileHandler)
            if (path) {
                let fileNode = this.#findNodeFromPath(path, this.#fileSystemTree);
            } else{
                let fileArray = Object.entries(this.#fileTable);
                let opened = false;
                
                for (let entry of fileArray){
                    if (await entry[1].isSameEntry(fileHandler)){
                        opened = true
                        break;
                    }
                }
                if (opened){

                }else{

                }
            }

        }
    }

    //Static
    //File Access API requires its picker methods to be invoked directly 
    static getRootDirectoryHandler = async () => {
        const rootHandler = await window.showDirectoryPicker();// to add try-catch block
        FileSystem.#instance.#setRootHandler(rootHandler);
        return rootHandler;
    }

    static getFileHandler = async () => {
        return await window.showOpenFilePicker();// to add try-catch block
    }

    static showRootHandler = () => FileSystem.#instance.getRootHandler();

    static async getNewFileHandle() {
        /*         const options = {
                    types: [
                        {
                            description: 'Text Files',
                            accept: {
                                'text/plain': ['.txt'],
                            },
                        },
                    ],
                }; */
        const handle = await window.showSaveFilePicker();
        return handle;
    };
}
export default FileSystem;
export const FileSystemInstance = new FileSystem();