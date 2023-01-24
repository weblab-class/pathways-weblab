import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "@reach/router";
import "../../utilities.css";
import "./Inputs.css";
import { Link } from "@reach/router";

const Inputs = (props) => {
  const location = useLocation();
  const project_id = location.state.project_id;
  return (
    <div>
      <Link to="/projects/" className="Go-Back-Button">Back</Link>
      <h1>{project_id}</h1>
      <h1> Inputs </h1>
      <div className="HorizontalLine"></div>
      <h2>Project Type: "input variable with project type"</h2>
      <h3>Materials</h3>

    </div>
  );
};
export default Inputs;