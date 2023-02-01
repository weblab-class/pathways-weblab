import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@reach/router";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Inputs.css";
import { Link } from "@reach/router";

const Inputs = (props) => {
  const [project, setProject] = useState([]);
  const [concreteQuantity, setConcreteQuantity] = useState(0);
  const [concreteQuantityUnit, setConcreteQuantityUnit] = useState("kg");
  const [steelQuantityUnit, setSteelQuantityUnit] = useState("kg");
  const [steelQuantity, setSteelQuantity] = useState(0);
  const [timberQuantity, setTimberQuantity] = useState(0);
  const [timberQuantityUnit, setTimberQuantityUnit] = useState("kg");
  const [glassQuantity, setGlassQuantity] = useState(0);
  const [glassQuantityUnit, setGlassQuantityUnit] = useState("kg");
  const locationfc = useLocation();

  // Get the project information
  useEffect(() => {
    get("/api/project", { project_id: locationfc.state.project_id }).then((projectObj) => {
      setProject(projectObj[0]);
    });
    get("/api/inputs", { project_id: locationfc.state.project_id }).then((inputObj) => {
      if (inputObj) {
        console.log(inputObj);

        setConcreteQuantity(inputObj[0].materials.concrete.quantity);
        setConcreteQuantityUnit(inputObj[0].materials.concrete.unit);
        setSteelQuantity(inputObj[0].materials.steel.quantity);
        setSteelQuantityUnit(inputObj[0].materials.steel.unit);
        setTimberQuantity(inputObj[0].materials.timber.quantity);
        setTimberQuantityUnit(inputObj[0].materials.timber.unit);
        setGlassQuantity(inputObj[0].materials.glass.quantity);
        setGlassQuantityUnit(inputObj[0].materials.glass.unit);
        console.log(steelQuantity);
      } else {
      }
    });
  }, []);

  // called whenever the user types in the concrete box
  const handleConcreteQuantityChange = (event) => {
    let val = event.target.value;
    if (val >= 0) {
      setConcreteQuantity(event.target.value);
    }
  };

  // called whenever the user types in the concrete box
  const handleConcreteQuantityUnitChange = (event) => {
    setConcreteQuantityUnit(event.target.value);
  };

  // called whenever the user types in the steel box
  const handleSteelQuantityChange = (event) => {
    let val = event.target.value;
    if (val >= 0) {
      setSteelQuantity(event.target.value);
    }
  };

  // called whenever the user types in the concrete box
  const handleSteelQuantityUnitChange = (event) => {
    setSteelQuantityUnit(event.target.value);
  };

  // called whenever the user types in the timber box
  const handleTimberQuantityChange = (event) => {
    let val = event.target.value;
    if (val >= 0) {
      setTimberQuantity(event.target.value);
    }
  };

  // called whenever the user types in the timber unit box
  const handleTimberQuantityUnitChange = (event) => {
    setTimberQuantityUnit(event.target.value);
  };

  // called whenever the user types in the glass box
  const handleGlassQuantityChange = (event) => {
    let val = event.target.value;
    if (val >= 0) {
      setGlassQuantity(event.target.value);
    }
  };

  // called whenever the user types in the glass unit box
  const handleGlassQuantityUnitChange = (event) => {
    setGlassQuantityUnit(event.target.value);
  };

  // Create a input
  let navigate = useNavigate();
  const createInput = () => {
    const body = {
      project_id: locationfc.state.project_id,
      creator_id: locationfc.state.user_id,
      materials: {
        concrete: {
          quantity: concreteQuantity,
          unit: concreteQuantityUnit,
        },
        steel: {
          quantity: steelQuantity,
          unit: steelQuantityUnit,
        },
        timber: {
          quantity: timberQuantity,
          unit: timberQuantityUnit,
        },
        glass: {
          quantity: glassQuantity,
          unit: glassQuantityUnit,
        },
      },
    };
    post("/api/inputs", body).then((input) => {
      navigate("/results", { state: { project_id: input.project_id, user_id: input.creator_id } });
    });
  };

  return (
    <div>
      {props.userId ? (
        <div>
          <div className="InputBox">
            <h1 className = "InputsHeader">Inputs</h1>
            <div className="HorizontalLine"></div>
            <div className="buttonInputs">
            <Link to="/projects/" className="Go-Back-Button">
                Back to Projects
            </Link>
            <button
                  className="Go-Back-Button1"
                  onClick={() => {
                    createInput();
                  }}
                >
                  Calculate
            </button>
            </div>
            <div className="allInfo">
              <div> <img className="Display-Pic" src={project.picture} /></div>
              <div className = "Data">
                <h1>{project.project_name}</h1>
                <h2>Type: {project.project_type}</h2>
                <h2>{project.location_city}, {project.location_country}</h2>
                <div className = "materialList">
                <div className="material-container">
                  <div className="input-headers">Concrete</div>
                  <input
                    type="number"
                    min="0"
                    className="input-data"
                    name="Concrete Input"
                    id="favourite"
                    placeholder="Concrete quantity"
                    value={concreteQuantity}
                    onChange={handleConcreteQuantityChange}
                    size="20"
                  />

                  <div className="input-units">
                    <select
                      id="myList"
                      value={concreteQuantityUnit}
                      onChange={handleConcreteQuantityUnitChange}
                    >
                      <option>kg</option>
                      <option>pounds</option>
                    </select>
                  </div>
                </div>
                <div className="material-container">
                  <div className="input-headers">Steel</div>
                  <input
                    className="input-data"
                    type="number"
                    min="0"
                    name="Steel Input"
                    id="favourite"
                    placeholder="Steel quantity"
                    value={steelQuantity}
                    onChange={handleSteelQuantityChange}
                    size="20"
                  />

                  <div className="input-units">
                    <select
                      className="input-data"
                      id="myList"
                      value={steelQuantityUnit}
                      onChange={handleSteelQuantityUnitChange}
                    >
                      <option>kg</option>
                      <option>pounds</option>
                    </select>
                  </div>
                </div>
                <div className="material-container">
                  <div className="input-headers">Timber</div>
                  <input
                    className="input-data"
                    type="number"
                    min="0"
                    name="Timber Input"
                    id="favourite"
                    placeholder="Timber quantity"
                    value={timberQuantity}
                    onChange={handleTimberQuantityChange}
                    size="20"
                  />

                  <div className="input-units">
                    <select
                      className="input-data"
                      id="myList"
                      value={timberQuantityUnit}
                      onChange={handleTimberQuantityUnitChange}
                    >
                      <option>kg</option>
                      <option>pounds</option>
                    </select>
                  </div>
                </div>
                <div className="material-container">
                  <div className="input-headers">Glass</div>
                  <input
                    className="input-data"
                    type="number"
                    min="0"
                    name="Glass Input"
                    id="favourite"
                    placeholder="Glass quantity"
                    value={glassQuantity}
                    onChange={handleGlassQuantityChange}
                    size="20"
                  />

                  <div className="input-units">
                    <select
                      className="input-data"
                      id="myList"
                      value={glassQuantityUnit}
                      onChange={handleGlassQuantityUnitChange}
                    >
                      <option>kg</option>
                      <option>pounds</option>
                    </select>
                  </div>
                </div>
                </div>
                </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Please Log In</div>
      )}
    </div>
  );
};
export default Inputs;
