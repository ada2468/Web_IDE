import { Dispatch } from 'redux';
import { searchTable as searchTableType } from "file-system";
import {
    ImportFolderAction,
    SaveAction,
    CopyAction,
    PasteAction,
    MoveAction,
    DeleteAction,
    RefreshAction,
    ExpandFolderAction,
    ContractFolderAction,
    GetDirectoryHandler,
    Action,
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