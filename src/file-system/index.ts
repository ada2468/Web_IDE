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

    //Potential Problem: same file opened.
    storeFileHandlers(fileHandlers: Array<FileSystemFileHandle>) {
        const idArray: Array<string> = [];
        let uuid: string;
        for (let fileHandler of fileHandlers) {
            if (this.#rootHandler?.resolve(fileHandler)) {

            } else {
                uuid = uuidv4();
                this.#fileTable[uuid] = fileHandler;
            }

            idArray.push(uuid);
        }
        return idArray;
    }

    async readFileContent(fileHandlers: Array<FileSystemFileHandle>) {
        const contentArray: Array<{ name: string, content: string }> = [];
        let file: File;
        let content: string;
        let name: string;
        for (let fileHandler of fileHandlers) {
            file = await fileHandler.getFile();
            content = await file.text();
            name = file.name;
            contentArray.push({ name, content });
        }
        return contentArray;
    }


    //to-do:implement checkDuplicateOpen - 1 check in directory and already opened

    //Static
    //File Access API requires its picker methods to be invoked directly 
    static getRootDirectoryHandler = async () => {
        const rootHandler = await window.showDirectoryPicker();// to add try-catch block
        FileSystem.#instance.#setRootHandler(rootHandler)
    }

    static getFileHandler = async () => {
        return await window.showOpenFilePicker();// to add try-catch block
    }

    static showRootHandler = () => FileSystem.#instance.getRootHandler();

    static async getNewFileHandle() {
        const options = {
            types: [
                {
                    description: 'Text Files',
                    accept: {
                        'text/plain': ['.txt'],
                    },
                },
            ],
        };
        const handle = await window.showSaveFilePicker(options);
        return handle;
    };



}
export default FileSystem;
export const FileSystemInstance = new FileSystem();