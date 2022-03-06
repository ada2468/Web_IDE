import React from 'react';
import { useDispatch, connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import {
  Menu,
  MenuList as DefaultMenuList,
  MenuButton as DefaultMenuButton,
  MenuItem
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { RootState } from 'redux/reducers';
import actions from 'redux/actions';
import FileSystem, { FileSystemInstance } from 'file-system';

export const HEADER_HEIGHT = '2.5rem';

const title = "       ";

const Container = styled.header`
  position: relative;
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  background-color: ${props => props.theme.bg3};
  border-bottom: 1px solid ${props => props.theme.bg1};
`;

const MenuButton = styled(DefaultMenuButton)`
width:4rem;
height:100%;
background-color: ${props => props.theme.bg3};
color:${props => props.theme.white};
border:0px;
font-size: 1rem;
`

const MenuList = styled(DefaultMenuList)`
background-color: ${props => props.theme.bg3};
color:${props => props.theme.white};
`
const mapState = (state: RootState) => {
  return { 'editorState': state.fileSystem.editorState, 'currentIndex': state.fileSystem.currentIndex };
}

const Header = (props: PropsFromRedux) => {
  const dispatch = useDispatch();
  const { editorState, currentIndex } = props
  const currentId = editorState[currentIndex]?.id;
  const fileType = editorState.find(file => file.id === currentId)?.type;

  //const reduxState = useSelector((state: RootState) => state.fileSystem);

  const onOpenDirectory = async () => {
    const rootHandler = await FileSystem.getRootDirectoryHandler();
    if (rootHandler) {
      dispatch(actions.getDirHandler());
    }
  }

  const onOpenFile = async () => {
    const fileHandler = await FileSystem.getFileHandler();
    if (fileHandler) {
      dispatch(actions.open(fileHandler));
    }
  }

  const onCreate = async () => {
    const id = FileSystemInstance.createNewFilePlaceHolder();
    dispatch(actions.newFile(id));
  }

  const onSave = async () => {
    dispatch(actions.save());
  }

  const onSaveAs = async () => {
    const newFileHandler = await FileSystem.getNewFileHandle();
    dispatch(actions.saveAs(newFileHandler));
  }

  /*   const onCheck = async () => {
      const fileHandler = FileSystemInstance.idToFileHandler(currentId);
      const directory = FileSystemInstance.getRootHandler();
      const path = await directory.resolve(fileHandler);
      console.log(path);
    } */

  return (
    <Container>
      <div style={{ width: "0.5rem" }}>{title}</div>
      <Menu>
        <MenuButton>
          File
        </MenuButton>

        <MenuList>

          <MenuItem onSelect={onCreate}>
            New File
          </MenuItem>

          <MenuItem onSelect={onOpenFile}>
            Open File...
          </MenuItem>

          <MenuItem onSelect={onOpenDirectory}>
            Open Folder...
          </MenuItem>

          <MenuItem onSelect={onSave}>
            Save
          </MenuItem>

          <MenuItem onSelect={onSaveAs}>
            Save As...
          </MenuItem>

        </MenuList>
      </Menu>
    </Container >
  );
};

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);