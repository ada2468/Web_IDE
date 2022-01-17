import { FunctionComponent } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { colors } from 'theme/colors';

import { Header } from './main/Header';
import Sider from './main/Sider';
import EditorBlock from './main/EditorBlock';
import { BrowserBlock } from './main/BrowserBlock';
const GlobalStyles = createGlobalStyle<{ theme: any }>`
  html,
  body {
    background-color: ${props => props.theme.bg1};
    margin: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: ${props => props.theme.white};

    font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;

    text-rendering: optimizeLegibility;
    color: ${props => props.theme.white};
    font-size: 16px !important;

    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  #root {
    height: 100%;
  }

  button {
    font-family: inherit;
  }

  a {
    transition: 0.3s ease color;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;

    text-decoration: none;


    &:hover {
      color: ${props => props.theme.white};
    }
  }

  * {
    box-sizing: border-box;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;
const Main = styled.main`
  height: 100%;
`;


const Layout: FunctionComponent = () => {
  return (
    <ThemeProvider theme={colors}>
      <Main>
        <GlobalStyles />
        <Header></Header>
        <Wrapper>
          <Sider></Sider>
          <EditorBlock></EditorBlock>
          {//<BrowserBlock></BrowserBlock>
          }
        </Wrapper>
      </Main>
    </ThemeProvider>
  )
}

export default Layout;