import { produce, Draft } from 'immer';
import { fileSystemStateTable, fileSystemState, stateType, fileSystemStateNode } from "../states/states";
import { searchTable, fileSystemNode, FileSystemInstance } from 'file-system';
import { ActionType, Action } from "../actions";

const initialState: stateType = { rootId: "", fileSystemState: {}, editorState: [], currentIndex: -1 };

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
            return { ...createFileSystemState(searchTable), editorState: [], currentIndex: -1 };

        case ActionType.NEW_EDITOR:
            const { fileArray } = action.payload;
            fileArray.forEach(fileState => {
                state.editorState.push({ id: fileState.id, name: fileState.name, content: fileState.content, type: fileState.type });
            });
            state.currentIndex = state.editorState.length - 1;
            return state;

        case ActionType.CHANGE_EDITOR_CONTENT:
            const content = action.payload.content;
            state.editorState[state.currentIndex].content = content;
            return state;

        case ActionType.CLOSE_EDITOR:
            const index: number = action.payload.index;
            const id = state.editorState[index].id;
            const editorState = state.editorState;
            FileSystemInstance.removeFileFromFileTable(id);
            if (index !== -1) editorState.splice(index, 1);
            if (index >= editorState.length) state.currentIndex -= 1;
            return state;

        case ActionType.NEW_FILE:
            state.editorState.push(
                {
                    id: action.payload.id,
                    name: "New File",
                    content: "",
                    type: "new"
                }
            )
            state.currentIndex = state.editorState.length - 1;
            return state;

        case ActionType.SET_CURRENT_INDEX:
            state.currentIndex = action.payload.index;
            return state;

        case ActionType.SAVE_AS_STATE_UPDATE:
            const { desId, desName, desType, ancestorId } = action.payload
            //update fileSystemState
            if (desType === "infolder" && !(desId in state.fileSystemState)) {
                state.fileSystemState[desId] = {
                    name: desName,
                    id: desId,
                    kind: "file",
                    children: undefined
                }
                if (ancestorId) {
                    state.fileSystemState[ancestorId].children.push(desId)
                    state.fileSystemState[ancestorId].children.sort()
                }
            }

            //update editor state
            state.editorState[state.currentIndex].id = desId;
            state.editorState[state.currentIndex].name = desName;
            state.editorState = state.editorState.filter((editorState, index) => (index === state.currentIndex) || (editorState.id !== desId));
            state.currentIndex = state.editorState.findIndex(editorState => editorState.id === desId);
            return state;

        default:
            return state;
    }

})

export default reducer;