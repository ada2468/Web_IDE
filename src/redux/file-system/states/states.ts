export type fileSystemStateChild = Array<string>;

export interface fileSystemStateNode{
    readonly id: string,
    readonly name:string,
    readonly kind: "file" | "directory",
    readonly children?: fileSystemStateChild,
}

export interface fileSystemStateTable{
    readonly [nodeId:string]:fileSystemStateNode,
} 

export interface fileSystemState{
    readonly table?:fileSystemStateTable,
    readonly rootId:string
}

