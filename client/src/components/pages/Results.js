import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./Results.css";
import { Link } from "@reach/router";

const Results = (props) => {
  return (
    <div>
      <h1>Our Results Section</h1>
      <p> This is the results section. </p>
      <Link to="/projects/" className="Go-Back-Button">Back</Link>
    </div>
  );
};

export default Results;