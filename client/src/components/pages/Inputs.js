import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./Inputs.css";
import { Link } from "@reach/router";

const Inputs = (props) => {
  return (
    <div>
      <h1>Our Inputs Section</h1>
      <p> This is the inputs section. </p>
      <Link to="/projects/" className="Go-Back-Button">Back</Link>
    </div>
  );
};

export default Inputs;