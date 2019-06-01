import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Routes from "./Routes";
import Header from "./components/Header";

const GlobayStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    min-width: 320px;
    min-height: 600px;
    background-color: #eeeeee;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
`;

const StyledContentBody = styled.div`
  padding: 12px;
`;

const App = () => (
  <React.Fragment>
    <GlobayStyle />
    <Header />
    <StyledContentBody>
      <Routes />
    </StyledContentBody>
  </React.Fragment>
);

export default App;
