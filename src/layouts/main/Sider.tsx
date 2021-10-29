import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'redux/reducers';
import FileSystemDisplay from 'components/FileSystemDisplay';
import { stateType } from 'redux/file-system/states/states';

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

const mapState = (state: RootState) => state;
const Sider = (props:PropsFromRedux) => {
  const fileSystemState = props.fileSystem;
  return (
  <Container>
    <Header>{"Explorer"}</Header>
    <Wrapper>
      <FileSystemDisplay fileSystem={fileSystemState as stateType}/>
    </Wrapper>
  </Container>)
};

const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Sider);
