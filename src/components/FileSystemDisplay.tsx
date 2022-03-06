import TreeView from '@material-ui//lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from 'components/FileDisplay/TreeItem';
import { stateType, fileSystemStateNode, fileSystemStateTable ,fileState } from 'redux/file-system/states/states';

interface Props { fileSystem: stateType };

const FileSystemDisplay = ({ fileSystem }: Props) => {

    const renderTree = (node: fileSystemStateNode, table: fileSystemStateTable, editorState:Array<fileState>) => {
        if (!node) return [];
        let tree: Array<JSX.Element> = [
            (
                <TreeItem key={node.id} node={node} editorState={editorState}>
                    {"children" in node && Array.isArray(node.children) ? node.children.map((childId) => {
                        return renderTree(table[childId], table, editorState)
                    }) : []}
                </TreeItem>
            )]
        return tree;
    };

    const treeView = (<TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
    >
        {fileSystem.rootId !== "" ? renderTree(fileSystem.fileSystemState[fileSystem.rootId], fileSystem.fileSystemState, fileSystem.editorState) : []}
    </TreeView>);

    return (
        <>
            {fileSystem.rootId !== "" ? treeView : []}
        </>
    )

}

export default FileSystemDisplay;