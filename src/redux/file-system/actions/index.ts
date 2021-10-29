import { searchTable } from "file-system";

export enum ActionType {
    //File System ralated action types
    GET_DIRECTORY_HANDLER = 'get_directory_handler',
    OPEN = 'open',
    OPEN_TREE_ITEM = 'open_tree_item',
    NEW_EDITOR = "new_editor",
    IMPORT_FOLDER = 'import_folder',
    SAVE = 'save',
    COPY = 'copy',
    PASTY = 'paste',
    MOVE = 'move',
    DELETE = 'delete',

    // not used
    // REFRESH = 'refresh',
    // EXPAND_FOLDER = 'expand_folder',
    // CONTRACT_FOLDER = 'contract_folder',
}

export type fileArrayType = Array<{
    id: string;
    name: string;
    content: string;
}>


//File System ralated actions 
export interface GetDirectoryHandler {
    type: ActionType.GET_DIRECTORY_HANDLER;
}

export interface ImportFolderAction {
    type: ActionType.IMPORT_FOLDER;
    payload: {
        searchTable: searchTable;
    };
}

export interface SaveAction {
    type: ActionType.SAVE;
    payload: {
        id: number;
        to: number;
    }
}

export interface Open {
    type: ActionType.OPEN;
    payload: {
        fileHandler: Array<FileSystemFileHandle>;
    }
}

export interface OpenTreeItem {
    type: ActionType.OPEN_TREE_ITEM;
    payload: {
        fileHandler: Array<FileSystemFileHandle>;
        id: Array<string>;
    }
}


export interface NewEditor {
    type: ActionType.NEW_EDITOR;
    payload: {
        fileArray: fileArrayType
    }
}

export interface CopyAction {
    type: ActionType.COPY;
    payload: {
        id: number;
    }
}

export interface PasteAction {
    type: ActionType.PASTY;
    payload: {
        id: number;
        to: number;
    }
}

export interface MoveAction {
    type: ActionType.MOVE;
    payload: {
        id: number;
        to: number;
    }
}

export interface DeleteAction {
    type: ActionType.DELETE;
    payload: {
        id: number;
    }
}



export type Action =
    | ImportFolderAction
    | GetDirectoryHandler
    | Open
    | NewEditor
    | SaveAction
    | CopyAction
    | PasteAction
    | MoveAction
    | DeleteAction
    | OpenTreeItem
    ;
