import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./Projects.css";
import { Link } from "@reach/router";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";
import Card from "../modules/Card.js";

import Modal from "react-modal";
const customStyles = {
content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 400,
  },
};

const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  //this section is screwing up the website
  // useEffect(() => {
  //   get("/api/projects").then((projectObj) => {
  //     setProjects(projectObj);
  //   });
  // },[])

  let myProjectsList = null;
  const hasProjects = projects.length !== 0;
  

  if(hasProjects) {
    myProjectsList = projects.map((projectObj) => (
      <Card
        project_id={projectObj._id}
        project_name={projectObj.project_name}
        project_type={projectObj.project_type}
        creator_id={projectObj.creator_id}
        location={projectObj.location}
        picture={projectObj.picture}
        results={projectObj.results}
      />
    ))
  } else {
   myProjectsList = <div className="Start-Project">Start a Project!</div>;
  }

  return (
    <div>
      {
        props.userId ? 
        <div className="ProjBox">
          <div className="App">
            <button onClick={setModalOpen}>Create Project</button>
              <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customStyles}
              >
                <div>fill in</div>

                <button onClick={() => setModalOpen(false)}>Close Modal</button>
              </Modal>
          </div>
           <h1 className="ProjTitle">My Projects</h1>
           <div>{myProjectsList}</div>
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