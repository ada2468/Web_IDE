import { searchTable } from "file-system";

export enum ActionType {
    //File System ralated action types
    GET_DIRECTORY_HANDLER = 'get_directory_handler',
    IMPORT_FOLDER = 'import_folder',
    SAVE = 'save',
    COPY = 'copy',
    PASTY = 'paste',
    MOVE = 'move',
    DELETE = 'delete',
    REFRESH = 'refresh',
    EXPAND_FOLDER = 'expand_folder',
    CONTRACT_FOLDER = 'contract_folder',
}

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

export interface RefreshAction {
    type: ActionType.REFRESH;
    payload: null;
}

export interface ExpandFolderAction {
    type: ActionType.EXPAND_FOLDER;
    payload: {
        id: number;
    }
}

export interface ContractFolderAction {
    type: ActionType.CONTRACT_FOLDER;
    payload: {
        id: number;
    }
}



export type Action =
    | ImportFolderAction
    | SaveAction
    | CopyAction
    | PasteAction
    | MoveAction
    | DeleteAction
    | RefreshAction
    | ExpandFolderAction
    | ContractFolderAction
    | GetDirectoryHandler;
