import { produce, Draft } from 'immer';
import { fileSystemStateTable, fileSystemState, stateType, fileSystemStateNode } from "../states/states";
import { searchTable, fileSystemNode } from 'file-system';
import { ActionType, Action } from "../actions";

const initialState: stateType = { rootId: "", fileSystemState: {}, editorState: [], currentId:null };

/*
function createFileSystemState: generate new state from the info from file system 
input:
    rootId:ID of root directory
    searchTable: map of <id,fileSystemNode>
output:
    new fileSystemState
*/
const createFileSystemState = (searchTable: searchTable) => {
    const array: Array<[string, fileSystemStateNode]> = [];
    let node: fileSystemStateNode;
    let value: fileSystemNode | string;
    for (const key in searchTable) {
        if (key !== "rootId") {
            value = searchTable[key] as fileSystemNode;
            node = {
                name: value.handle.name,
                id: value.id,
                kind: value.handle.kind,
                children: "children" in value ? value.children.map((node) => { return node.id }) : undefined
            }
            array.push([key, node]);
        }
    }
    const fileSystemState: fileSystemStateTable = Object.fromEntries(array);
    const newFileSystemState: fileSystemState = { rootId: searchTable.rootId, fileSystemState: fileSystemState };
    return newFileSystemState;
}



const reducer = produce((state: Draft<stateType> = initialState, action: Action) => {
    switch (action.type) {
        //action: import folder
        case ActionType.IMPORT_FOLDER:
            const { searchTable } = action.payload;
            return { ...createFileSystemState(searchTable), editorState: [], currentId:null };

        case ActionType.NEW_EDITOR:
            const { fileArray } = action.payload;
            fileArray.forEach(fileState => {
                state.editorState.push({id:fileState.id,name:fileState.name,content:fileState.content, type:fileState.type});
                state.currentId  = fileState.id;
            });
            return state;

        case ActionType.NEW_FILE:
            state.editorState.push(
                {id:action.payload.id,
                name:"New File",
                content:"",
                type:"new"}
            )
            
            return state;

        case ActionType.SET_CURRENT_ID:
            state.currentId = action.payload.id;
            return state;
            
        default:
            return state;
    }

})

export default reducer;