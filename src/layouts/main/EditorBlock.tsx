import React, { useEffect } from 'react';
import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { RootState } from 'redux/reducers';
import { setCurrentId, closeEditor } from 'redux/actions';
import { connect, ConnectedProps } from 'react-redux';
import Editor from 'components/Editor';


const Container = styled.div`
  width: 100%;
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
  return { 'editorState': state.fileSystem.editorState, 'currentId': state.fileSystem.currentId };
}

const EditorBlock = (props: PropsFromRedux) => {

  const { editorState, currentId } = props;
  type editorStateType = typeof editorState;



  const handleChange = ( event:React.SyntheticEvent, newValue: string) => {
    console.log("yee2")
    props.dispatch(setCurrentId(newValue));

  };

  const handleTabClick = (event: React.SyntheticEvent,id: string) =>{
    event.stopPropagation();
    props.dispatch(closeEditor(id))
  }

  const createTab = (editorState: editorStateType = []) => {
    return editorState.map((state, index) => {
      const content = <div>
        <span>{state.name}</span>
        <CloseOutlinedIcon fontSize={"small"} viewBox={"-3 -7 26 26"} onClick={(e:React.SyntheticEvent)=>handleTabClick(e,state.id)} />
      </div>;
      return (<Tab label={content} value={state.id} />)

    })
  }


  return (
    <Container>
      <Header>
        <StyledTabs
          value={currentId}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {createTab(editorState)};
        </StyledTabs>
      </Header>
      <Wrapper>

        <Editor id={currentId} content={
          editorState[editorState.findIndex(state => state.id === currentId)]?.content
        } />
      </Wrapper>
    </Container>
  );
};
const connector = connect(mapState);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(EditorBlock);