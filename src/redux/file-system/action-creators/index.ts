import { searchTable as searchTableType } from "file-system";

import {
    GetDirectoryHandler,
    ImportFolderAction,
    Open,
    SetCurrentIndex,
    NewEditor,
    CloseEditor,
    fileArrayType,
    OpenTreeItem,
    NewFile,
    Save,
    SaveAs,
    ActionType,
    SaveAsStateUpdate,
    ChangeEditorContent,
} from '../actions';

interface importFolderInputType {
    searchTable: searchTableType,
}


export const importFolder = ({ searchTable }: importFolderInputType): ImportFolderAction => {
    return {
        type: ActionType.IMPORT_FOLDER,
        payload: {
            searchTable
        }
    }
}

export const getDirHandler = (): GetDirectoryHandler => {
    return {
        type: ActionType.GET_DIRECTORY_HANDLER,
    }
}

export const open = (fileHandler: Array<FileSystemFileHandle>): Open => {
    return {
        type: ActionType.OPEN,
        payload: {
            fileHandler
        }
    }
}

export const newEditor = (fileArray: fileArrayType): NewEditor => {
    return {
        type: ActionType.NEW_EDITOR,
        payload: {
            fileArray
        }
    }
}

export const changeEditorContent = (content: string): ChangeEditorContent => {
    return {
        type: ActionType.CHANGE_EDITOR_CONTENT,
        payload: {
            content
        }
    }
}

export const closeEditor = (index: number): CloseEditor => {
    return {
        type: ActionType.CLOSE_EDITOR,
        payload: {
            index
        }
    }
}



export const openTreeItem = (fileHandler: Array<FileSystemFileHandle>, id: Array<string>): OpenTreeItem => {
    return {
        type: ActionType.OPEN_TREE_ITEM,
        payload: {
            fileHandler,
            id
        }
    }

}

export const newFile = (id: string): NewFile => {
    return {
        type: ActionType.NEW_FILE,
        payload: {
            id
        }
    }
}

export const setCurrentIndex = (index: number): SetCurrentIndex => {
    return {
        type: ActionType.SET_CURRENT_INDEX,
        payload: {
            index
        }
    }
}

export const saveAs = (destinationHandler: FileSystemFileHandle): SaveAs => {
    return {
        type: ActionType.SAVE_AS,
        payload: {
            destinationHandler
        }
    }
}

export const save = (): Save => {
    return {
        type: ActionType.SAVE,
        payload: {
        }
    }
}


export const saveAsStateUpdate = ( desId: string, desName: string, desType: string, ancestorId: string): SaveAsStateUpdate => {
    return {
        type: ActionType.SAVE_AS_STATE_UPDATE,
        payload: {
            ancestorId,
            desId,
            desName,
            desType
        }
    }
}