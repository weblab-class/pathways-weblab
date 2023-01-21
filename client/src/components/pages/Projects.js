import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./Projects.css";
import { Link } from "@reach/router";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";


const Projects = (props) => {
  return (
    <div>
      {
        props.userId ? 
        <div className="ProjBox">
           <h1 className="ProjTitle">My Projects</h1>
          <div className="HorizontalLine"></div>
           <h1 className="ProjTitle">Templates</h1>
          <div className="HorizontalLine"></div>
        </div>
  : 
  <div className ="ProjBox">
    <h1 className="ProjTitle">Templates</h1>
    <div className="HorizontalLine"></div>
  </div>

      }
    </div>
  )    
};

export default Projects;