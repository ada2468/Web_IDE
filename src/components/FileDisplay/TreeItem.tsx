import React from 'react';
import MuiTreeItem from '@material-ui/lab/TreeItem';
import { useDispatch } from 'react-redux';
import { FileSystemInstance as fileSystem, fileSystemNode } from 'file-system';
import { fileSystemStateNode, fileState } from 'redux/file-system/states/states';
import { openTreeItem } from 'redux/actions'

interface Props {
    children: React.ReactNode,
    node: fileSystemStateNode,
    editorState:Array<fileState>,
}

const TreeItem = ({ children, node, editorState }: Props) => {
    const disPatch = useDispatch();
    const handleDoubleClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
        event.stopPropagation();
        const id = node.id;
        const searchTable = fileSystem.getSearchTable();
        if (searchTable[id] !== undefined ) {
            const fileSystemNode = searchTable[id] as fileSystemNode;
            if (fileSystemNode.handle.kind === "file" && editorState.find(state=>state.id===id)===undefined) {
                disPatch(openTreeItem([fileSystemNode.handle as FileSystemFileHandle],[id]));
            }
        }
    };

    return (
        <MuiTreeItem key={node.id} nodeId={node.id} label={node.name} onDoubleClick={handleDoubleClick}>
            {children}
        </MuiTreeItem>)
};

export default TreeItem;