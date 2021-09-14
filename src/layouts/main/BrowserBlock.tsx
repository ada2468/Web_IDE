import React from 'react';
import styled from 'styled-components';
import Preview from 'components/Preview';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.bg2};
  font-size: 1.4375rem;

  svg {
    margin-bottom: 2rem;
  }
`;

const WrapperPreview = styled.div`
  display: flex;
  flex:1;
  height:50%;
  width:100%;
`;

export const BrowserBlock: React.FC = ({ children }) => (
    <Container>
        <WrapperPreview>
            <Preview></Preview>
        </WrapperPreview>
        <WrapperPreview>
        </WrapperPreview>
    </Container>
);
