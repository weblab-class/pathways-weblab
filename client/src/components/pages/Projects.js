import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./Projects.css";
import { Link } from "@reach/router";
import { socket } from "../../client-socket.js";
import { get } from "../../utilities";
import Card from "../modules/Card.js";
import Modal from "react-modal";
import Dropdown from "../modules/Dropdown.js";

//layout for modal
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
    height: 400,
  },
};

const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  
  useEffect(() => {
    get("/api/projects").then((projectObj) => {
      setProjects(projectObj);
    });
  },[])

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
        emissions={projectObj.emissions}
        results={projectObj.results_id}
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
            <button className = "Create-Project-Button" onClick={setModalOpen}>Create Project</button>
              <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={customStyles}
              >
                <h2>NEW PROJECT</h2>
                <button onClick={() => setModalOpen(false)}>X</button>
                <div>Input a Project Name:</div>
                <input type = "text" id = "favourite" size = "20" /> 

                <div>Select a Project Type:</div>
                <Dropdown/>

                <button onClick={() => setModalOpen(false)}>Delete</button>
                <Link to="/inputs/" className="Create-Final">Create</Link>
              </Modal>
          </div>
           <h1 className="ProjTitle">My Projects</h1>
          <div className="HorizontalLine"></div>
          <div>{myProjectsList}</div>
           <h1 className="ProjTitle">Templates</h1>
          <div className="HorizontalLine"></div>
          <Card
            project_name={"Daniela's Test"}
            location={"Cuba"}
            emissions={20}
            picture={"https://cdn-images.article.com/products/SKU379A/2890x1500/image81730.jpg"}
          />
        </div>
  : 
  <div className ="ProjBox">
    <h1 className="ProjTitle">Templates</h1>
    <div className="HorizontalLine"></div>
    <Card
        project_name={"Daniela's Test"}
        location={"Cuba"}
        emissions={20}
        picture={"https://cdn-images.article.com/products/SKU379A/2890x1500/image81730.jpg"}
      />
  </div>
      
      }
    </div>
  )    
};
export default Projects;