import React, { useEffect } from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { RootState } from 'redux/reducers';
import { connect, ConnectedProps } from 'react-redux';
import Editor from 'components/Editor';

const Container = styled.div`
  width: 25rem;
  min-width: 25rem;
  height: 100%;
  border-right: 1px solid ${props => props.theme.bg3};
`;

const Header = styled.div`
  height: 2rem;
  padding: 0 0;
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

const StyledTabs = styled(({ children, ...other }) =>
  <Tabs
    {...other}
  >{children}</Tabs>
)`
  width: 100%;
  height: auto;
  & .MuiTouchRipple-root {
    visibility: hidden;
  }
`

const mapState = (state: RootState) => {
  return { 'editorState': state.fileSystem.editorState };
}

const EditorBlock = (props: PropsFromRedux) => {

  const { editorState } = props;
  type editorStateType = typeof editorState;
  const [value, setValue] = React.useState("");


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const createTab = (editorState: editorStateType = []) => {
    return editorState.map((state, index) => {
      return (<Tab label={state.name} value={state.id}/>)

    })
  }


  return (
    <Container>
      <Header>
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {createTab(editorState)};
        </StyledTabs>
      </Header>
      <Wrapper>
      
          <Editor id={value} content={

            editorState[editorState.findIndex(state=>state.id===value)]?.content
            
            }/>
      </Wrapper>
    </Container>
  );
};
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(EditorBlock);