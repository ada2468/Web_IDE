import React from 'react';
import styled from 'styled-components';
import TreeView from '@material-ui//lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { fileSystemState, fileSystemStateNode, fileSystemStateTable } from 'redux/file-system/states/states';

interface Props {
    fileSystem: fileSystemState
}

const FileSystemDisplay = ({ fileSystem }: Props) => {

    const renderTree = (node: fileSystemStateNode, table: fileSystemStateTable) => {
        if (!node) return []
        let tree: Array<JSX.Element> = [
            (
                <TreeItem key={node.id} nodeId={node.id} label={node.name}>
                    {"children" in node && Array.isArray(node.children) ? node.children.map((childId) => {
                        return renderTree(table[childId], table)
                    }) : []}
                </TreeItem>
            )]

        return tree;
    };

    const treeView = (<TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
    >
        {fileSystem.rootId !== "" ? renderTree(fileSystem.table[fileSystem.rootId], fileSystem.table) : []}
    </TreeView>);

    return (
        <>
            {fileSystem.rootId !== "" ? treeView : []}
        </>
    )

}

export default FileSystemDisplay;