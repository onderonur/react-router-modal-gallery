import React from "react";
import DirectorList from "./DirectorList";
import directors from "../data";

const Directors = () => (
  <React.Fragment>
    <h2>Directors</h2>
    <DirectorList directors={directors} />
  </React.Fragment>
);

export default Directors;
