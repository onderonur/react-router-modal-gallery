import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #fafafa;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Header = () => (
  <StyledHeader>
    <Link to="/directors" style={{ marginRight: "12px" }}>
      Directors
    </Link>
    <Link to="/movies">Movies</Link>
  </StyledHeader>
);

export default Header;
