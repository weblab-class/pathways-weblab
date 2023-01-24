import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./Inputs.css";
import { Link } from "@reach/router";

const Inputs = (props) => {
  return (
    <div>
      <Link to="/projects/" className="Go-Back-Button">Back</Link>
      <h1>"Variable with name of project"</h1>
      <h1> Inputs </h1>
      <div className="HorizontalLine"></div>
      <h2>Project Type: "input variable with project type"</h2>
      <h3>Materials</h3>
      
    </div>
  );
};

export default Inputs;