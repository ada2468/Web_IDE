import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';

import { fileSystemState } from 'redux/file-system/states/states';
import FileSystemDisplay from 'components/FileSystemDisplay';

const Container = styled.div`
  width: 10rem;
  min-width: 10rem;
  height: 100%;
  border-right: 1px solid ${props => props.theme.bg3};
`;

const Header = styled.div`
  height: 2rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  color: ${props => props.theme.white};
  font-size: 0.8125rem;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.bg2};
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

interface Props extends PropsFromRedux{}

const mapState = (state: fileSystemState) => state;
const Sider = (props) => {
  const fileSystemState = props.fileSystem as fileSystemState;
  return (
  <Container>
    <Header>{"Explorer"}</Header>
    <Wrapper>
      <FileSystemDisplay fileSystem={fileSystemState}/>
    </Wrapper>
  </Container>)
};

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Sider);
