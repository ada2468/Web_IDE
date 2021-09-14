import { v4 as uuidv4 } from 'uuid';

export interface fileSystemFileNode {
    id: string,
    handle: FileSystemHandle,
    ancestor?: fileSystemNode
}

export interface fileSystemDirectoryNode extends fileSystemFileNode {
    children: fileSystemTree,
}


export type fileSystemNode = fileSystemDirectoryNode | fileSystemFileNode;
export type fileSystemTree = fileSystemNode[];
export interface searchTable  {
    [id:string]:fileSystemNode|string,
    rootId?:string,
}





class FileSystem {
    #fileSystemTree: fileSystemTree = [];
    #rootHandler: FileSystemDirectoryHandle;
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
                    await this.#recursiveScanFolder.call(this,node);
                } else {
                    node = {
                        handle: handle,
                        id: uuid,
                        ancestor: ancestor,
                    }
                }
                ancestor['children'].push(node);
                ancestor['children'].sort(this.#compareFileSystemTree)
                this.#searchTable[uuid]=node;
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
    showRootHandler() {
        return this.#rootHandler;
    }

    async importFolder() {
        this.#fileSystemTree = [];
        this.#searchTable = {};
        const rootNode: fileSystemNode = {
            handle: this.#rootHandler,
            id: uuidv4(),
            children: []
        }

        this.#searchTable[rootNode.id]=rootNode;
        this.#searchTable['rootId']=rootNode.id;
        await this.#recursiveScanFolder.call(this,rootNode);
        this.#fileSystemTree.push(rootNode);
    }

    //Static
    static getRootDirectoryHandler = async () => {
        const rootHandler = await window.showDirectoryPicker();// to add try-catch block
        FileSystem.#instance.#setRootHandler(rootHandler)
    }
    static showRootHandler = () => FileSystem.#instance.showRootHandler();


}
export default FileSystem;
export const FileSystemInstance = new FileSystem();
