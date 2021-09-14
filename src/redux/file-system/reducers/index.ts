import produce from 'immer';
import { fileSystemStateTable, fileSystemState, fileSystemStateNode } from "../states/states";
import { searchTable, fileSystemNode } from 'file-system';
import { ActionType, Action } from "../actions";

const initialState: fileSystemState = {rootId:'', table: {} };


const reducer = produce((state: fileSystemState = initialState, action: Action) => {
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
                    children: "children" in value ? value.children.map((node) => {return node.id}) : undefined
                }
                array.push([key, node]);
            }
        }
        const table: fileSystemStateTable = Object.fromEntries(array);
        const newFileSystemState: fileSystemState = {rootId:searchTable.rootId,table:table};
        return newFileSystemState;
    }

    switch (action.type) {
        //action: import folder
        case ActionType.IMPORT_FOLDER:
            const {searchTable} = action.payload;
            return createFileSystemState(searchTable);

        //action: default should not happen
        default:
            return state;
    }

})

export default reducer;