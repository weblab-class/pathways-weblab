import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./Projects.css";
import { Link, useNavigate } from "@reach/router";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
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
    borderRadius: "25px",
    backgroundColor: "white",
    width: "25rem",
    height: 400,
  },
};

const Projects = (props) => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectCity, setProjectCity] = useState("");
  const [projectCountry, setProjectCountry] = useState("");
  const [projectPicture, setProjectPicture] = useState("");
  const [projectType, setProjectType] = useState("");

  // Get all projects
  useEffect(() => {
    get("/api/projects", { creator_id: props.userId }).then((projectObj) => {
      setProjects(projectObj);
    });
  }, [props.userId, projects]);

  // called whenever the user types in the name input box
  const handleNameChange = (event) => {
    setProjectName(event.target.value);
  };

  // called whenever the user types in the city location input box
  const handleCityChange = (event) => {
    setProjectCity(event.target.value);
    // console.log(event.target.value);
  };

  // called whenever the user types in the country location input box
  const handleCountryChange = (event) => {
    setProjectCountry(event.target.value);
  };

  // called whenever the user types in the picture input box
  const handlePictureChange = (event) => {
    setProjectPicture(event.target.value);
  };

  // called whenever the user changes the project type
  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value);
  };

  // Create a project
  let navigate = useNavigate();
  const createProject = () => {
    const body = {
      project_name: projectName,
      project_type: projectType,
      picture: projectPicture,
      location_city: projectCity,
      location_country: projectCountry,
    };
    post("/api/project", body).then((project) => {
      navigate("/inputs", { state: { project_id: project._id, user_id: props.userId } });
    });
  };

  // Navigate to input page when a project is created

  let myProjectsList = null;
  const hasProjects = projects.length !== 0;

  if (hasProjects) {
    myProjectsList = projects.map((projectObj) => (
      <Card
        project_id={projectObj._id}
        project_name={projectObj.project_name}
        project_type={projectObj.project_type}
        creator_id={projectObj.creator_id}
        picture={projectObj.picture}
        location_city={projectObj.location_city}
        location_country={projectObj.location_country}
      />
    ));
  } else {
    myProjectsList = <div className="Start-Project">Start a Project!</div>;
  }

  return (
    <div>
      {props.userId ? (
        <div className="ProjBox">
          <div className="App">
            <button className="Create-Project-Button" onClick={setModalOpen}>
              Create Project
            </button>
            <Modal
              className="modal"
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
              style={customStyles}
            >
              <button className="exit-button" onClick={() => setModalOpen(false)}>
                X
              </button>
              <h2 className="new-project-header">New Project</h2>

              <div className="input-project-headers">Input a Project Name:</div>
              <div className="input-project-user">
                <input
                  type="text"
                  name="Project Name Input"
                  id="favourite"
                  placeholder="Name of project here"
                  value={projectName}
                  onChange={handleNameChange}
                  size="20"
                />
              </div>
              <div className="input-project-headers">Select a Project Type:</div>
              <div className="input-project-user">
                <select id="myList" value={projectType} onChange={handleProjectTypeChange}>
                  <option> --- Select --- </option>
                  <option> Table </option>
                  <option> Garden Pot </option>
                  <option> Lamp </option>
                  <option> Kitchen Appliance </option>
                  <option> Backyard Shed </option>
                </select>
              </div>

              <div className="input-project-headers">Input a Project Location:</div>
              <div className="input-project-user">
                <input
                  type="text"
                  name="City Input"
                  id="favourite"
                  placeholder="City"
                  value={projectCity}
                  onChange={handleCityChange}
                  size="20"
                />
              </div>
              <div className="input-project-user">
                <input
                  type="text"
                  name="Country Input"
                  id="favourite"
                  placeholder="Country"
                  value={projectCountry}
                  onChange={handleCountryChange}
                  size="20"
                />
              </div>
              <div className="input-project-headers">Add a Picture:</div>
              <div className="input-project-user">
                <input
                  type="text"
                  name="projectPicture"
                  id="favourite"
                  placeholder="Paste a URL of a picture here"
                  value={projectPicture}
                  onChange={handlePictureChange}
                  size="20"
                />
              </div>
              <div className="delete-create-buttons">
                <button onClick={() => setModalOpen(false)}>Delete</button>
                <button
                  onClick={() => {
                    createProject();
                  }}
                >
                  Create
                </button>
                {/* <Link to="/inputs/" className="Create-Final" onClick={() => { createProject() }}>Create</Link>*/}
              </div>
            </Modal>
          </div>
          <h1 className="ProjTitle">My Projects</h1>
          <div className="HorizontalLine"></div>
          <div className="CardsList">{myProjectsList}</div>
          <h1 className="ProjTitle">Templates</h1>
          <div className="HorizontalLine"></div>
          <Card
            project_name="Template"
            project_id="63d330ca1007a20f205f9d61"
            location_city={"Havana"}
            location_country={"Cuba"}
            project_type={"Table"}
            picture={"https://cdn-images.article.com/products/SKU379A/2890x1500/image81730.jpg"}
          />
        </div>
      ) : (
        <div className="ProjBox">
          <h1 className="ProjTitle">My Projects</h1>
          <div className="HorizontalLine"></div>
          <div className="startProject">Login to create a project!</div>
          <h1 className="ProjTitle">Templates</h1>
          <div className="HorizontalLine"></div>
          <Card
            project_name="Template"
            project_id="63d330ca1007a20f205f9d61"
            creator_id="TEMPLATE"
            location_city={"Havana"}
            location_country={"Cuba"}
            project_type={"Table"}
            picture={"https://cdn-images.article.com/products/SKU379A/2890x1500/image81730.jpg"}
          />
        </div>
      )}
    </div>
  );
};
export default Projects;
