import React from 'react';
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import {
  Menu,
  MenuList as DefaultMenuList,
  MenuButton as DefaultMenuButton,
  MenuItem
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";

import actions from 'redux/actions';
import { ActionType } from 'redux/actions';
import FileSystem, {FileSystemInstance} from 'file-system';

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


export const Header: React.FC = () => {
  const dispatch = useDispatch();

  const onOpenDirectory = async () => {
    await FileSystem.getRootDirectoryHandler();
    dispatch(actions.getDirHandler());
  }

  return (
    <Container>
      <div style={{ width: "0.5rem" }}>{title}</div>
      <Menu>
        <MenuButton>
          File
        </MenuButton>
        <MenuList>
          <MenuItem onSelect={() => { alert("1") }}>
            Open...
          </MenuItem>
          <MenuItem onSelect={onOpenDirectory}>
            Open Directory...
          </MenuItem>
        </MenuList>
      </Menu>
    </Container >
  );
};