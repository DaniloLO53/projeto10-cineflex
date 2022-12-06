import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Home';
import Session from './Session';
import Sessions from './Sessions';

function App() {
  return (
    <StyledAppContainer>
      <StyledHeader>
        CINEFLEX
      </StyledHeader>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessoes/:idFilme" element={<Sessions />} />
        <Route path="/assentos/:idSessao" element={<Session />} />
      </Routes>
    </StyledAppContainer>
  );
}

const StyledAppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
`;

const StyledHeader = styled.div`
  width: 100%;
  background-color: #c3cfd9;
  color: #e8833a;
  font-size: 37px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

export default App;
