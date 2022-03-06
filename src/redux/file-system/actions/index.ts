import { searchTable } from "file-system";
import { fileState } from "../states/states";

export enum ActionType {
    GET_DIRECTORY_HANDLER = 'get_directory_handler',
    OPEN = 'open',
    OPEN_TREE_ITEM = 'open_tree_item',
    NEW_EDITOR = "new_editor",
    CLOSE_EDITOR = "close_editor",
    IMPORT_FOLDER = 'import_folder',
    CHANGE_EDITOR_CONTENT = "change_editor_content",
    SAVE = 'save',
    SAVE_AS = 'save_as',
    SAVE_AS_STATE_UPDATE = 'update_current_fs_state',
    COPY = 'copy',
    PASTY = 'paste',
    MOVE = 'move',
    DELETE = 'delete',
    NEW_FILE = 'new_file',
    SET_CURRENT_INDEX = 'set_current_index',

    // not used
    // REFRESH = 'refresh',
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
    }
}

export interface SetCurrentIndex {
    type: ActionType.SET_CURRENT_INDEX;
    payload: {
        index: number;
    }
}

export interface SaveAs {
    type: ActionType.SAVE_AS;
    payload: {
        destinationHandler: FileSystemFileHandle
    }
}

export interface SaveAsStateUpdate {
    type: ActionType.SAVE_AS_STATE_UPDATE;
    payload: {
        ancestorId: string,
        desId: string,
        desName: string,
        desType: string
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

export interface ChangeEditorContent{
    type: ActionType.CHANGE_EDITOR_CONTENT;
    payload: {
        content: string
    }
}

export interface CloseEditor {
    type: ActionType.CLOSE_EDITOR;
    payload: {
        index: number
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
    | SetCurrentIndex
    | CopyAction
    | PasteAction
    | MoveAction
    | DeleteAction
    | OpenTreeItem
    | NewFile
    | SaveAsStateUpdate
    | ChangeEditorContent
    ;
