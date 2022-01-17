import { searchTable } from "file-system";
import { fileState } from "../states/states";

export enum ActionType {
    //File System ralated action types
    GET_DIRECTORY_HANDLER = 'get_directory_handler',
    OPEN = 'open',
    OPEN_TREE_ITEM = 'open_tree_item',
    NEW_EDITOR = "new_editor",
    CLOSE_EDITOR = "close_editor",
    IMPORT_FOLDER = 'import_folder',
    SAVE = 'save',
    SAVE_AS = 'save_as',
    COPY = 'copy',
    PASTY = 'paste',
    MOVE = 'move',
    DELETE = 'delete',
    NEW_FILE = 'new_file',
    SET_CURRENT_ID = 'set_current_id',

    // not used
    // REFRESH = 'refresh',
    // EXPAND_FOLDER = 'expand_folder',
    // CONTRACT_FOLDER = 'contract_folder',
}

export type fileArrayType = Array<fileState>


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

export interface Save {
    type: ActionType.SAVE;
    payload: {
        id: string;
    }
}

export interface SetCurrentId {
    type: ActionType.SET_CURRENT_ID;
    payload: {
        id: string;
    }
}

export interface SaveAs {
    type: ActionType.SAVE_AS;
    payload: {
        handler: FileSystemFileHandle;
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

export interface CloseEditor {
    type: ActionType.CLOSE_EDITOR;
    payload: {
        id:string
    }
}

export interface NewFile {
    type: ActionType.NEW_FILE;
    payload: {
        id: string;
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
    | CloseEditor
    | Save
    | SaveAs
    | SetCurrentId
    | CopyAction
    | PasteAction
    | MoveAction
    | DeleteAction
    | OpenTreeItem
    | NewFile
    ;
