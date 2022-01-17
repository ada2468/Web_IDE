import { searchTable as searchTableType } from "file-system";

import {
    GetDirectoryHandler,
    ImportFolderAction,
    Open,
    SetCurrentId,
    NewEditor,
    CloseEditor,
    fileArrayType,
    OpenTreeItem,
    NewFile,
    SaveAs,
    ActionType
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

export const closeEditor = (id: string): CloseEditor => {
    return {
        type: ActionType.CLOSE_EDITOR,
        payload: {
            id
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

export const setCurrentId = (id: string): SetCurrentId => {
    return {
        type: ActionType.SET_CURRENT_ID,
        payload: {
            id
        }
    }
}

export const saveAs = (handler: FileSystemFileHandle): SaveAs => {
    return {
        type: ActionType.SAVE_AS,
        payload: {
            handler
        }
    }
}