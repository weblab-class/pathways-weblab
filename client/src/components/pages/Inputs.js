import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@reach/router";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Inputs.css";
import { Link } from "@reach/router";

const Inputs = (props) => {
  const [project, setProject] = useState([]);
  const [concreteQuantity, setConcreteQuantity] = useState(0);
  const [concreteQuantityUnit, setConcreteQuantityUnit] = useState(0);
  const [steelQuantityUnit, setSteelQuantityUnit] = useState(0);
  const [steelQuantity, setSteelQuantity] = useState(0);
  const [timberQuantity, setTimberQuantity] = useState(0);
  const [timberQuantityUnit, setTimberQuantityUnit] = useState(0);
  const [glassQuantity, setGlassQuantity] = useState(0);
  const [glassQuantityUnit, setGlassQuantityUnit] = useState(0);
  const locationfc = useLocation();

  // Get the project information
  useEffect(() => {
    get("/api/project", { project_id: locationfc.state.project_id }).then((projectObj) => {
      setProject(projectObj[0])

    });
  }, []);

  // called whenever the user types in the concrete box
  const handleConcreteQuantityChange = (event) => {
    setConcreteQuantity(event.target.value);
  };

  // called whenever the user types in the concrete box
  const handleConcreteQuantityUnitChange = (event) => {
    setConcreteQuantityUnit(event.target.value);
  };

  // called whenever the user types in the steel box
  const handleSteelQuantityChange = (event) => {
    setSteelQuantity(event.target.value);
  };

  // called whenever the user types in the concrete box
  const handleSteelQuantityUnitChange = (event) => {
    setSteelQuantityUnit(event.target.value);
  };

  // called whenever the user types in the timber box
  const handleTimberQuantityChange = (event) => {
    setTimberQuantity(event.target.value);
  };

  // called whenever the user types in the timber unit box
  const handleTimberQuantityUnitChange = (event) => {
    setTimberQuantityUnit(event.target.value);
  };

  // called whenever the user types in the glass box
  const handleGlassQuantityChange = (event) => {
    setGlassQuantity(event.target.value);
  };

  // called whenever the user types in the glass unit box
  const handleGlassQuantityUnitChange = (event) => {
    setGlassQuantityUnit(event.target.value);
  };

  console.log(project);

  // Create a project
  let navigate = useNavigate();
  const createInput = () => {
    const body = {
      project_id: locationfc.state.project_id,
      creator_id: locationfc.state.user_id,
      materials: {
        concrete: {
          quantity: concreteQuantity,
          unit: concreteQuantityUnit
        },
        steel: {
          quantity: steelQuantity,
          unit: steelQuantityUnit
        },
        timber: {
          quantity: timberQuantity,
          unit: timberQuantityUnit
        },
        glass: {
          quantity: glassQuantity,
          unit: glassQuantityUnit
        }
      }
    };
    post("/api/inputs", body).then((input) => {
      navigate("/results", { state: { project_id: input.project_id, user_id: input.creator_id } })
    });
  };

  return (
    <div>

      {locationfc.state.user_id ?
        <div>
          <div className="InputBox">
            <div>
              <Link to="/projects/" className="Go-Back-Button">Back</Link>
            </div>
            <div>
              <h1>{project.project_name}</h1>
              <h2>This project is a {project.project_type}</h2>
              {/* <h2>{project.location.city}</h2>
          <h2>{project.location.country}</h2> */}
              <div className="HorizontalLine"></div>
              <h2> Inputs </h2>

              <div>Concrete</div>
              <input type="number"
                name="Concrete Input"
                id="favourite"
                placeholder="Concrete quantity"
                value={concreteQuantity}
                onChange={handleConcreteQuantityChange}
                size="20"
              />

              <div>
                <select id="myList"
                  value={concreteQuantityUnit}
                  onChange={handleConcreteQuantityUnitChange} >
                  <option>kg</option>
                  <option>pounds</option>
                </select>
              </div>

              <div>Steel</div>
              <input type="number"
                name="Steel Input"
                id="favourite"
                placeholder="Steel quantity"
                value={steelQuantity}
                onChange={handleSteelQuantityChange}
                size="20"
              />

              <div>
                <select id="myList"
                  value={steelQuantityUnit}
                  onChange={handleSteelQuantityUnitChange} >
                  <option>kg</option>
                  <option>pounds</option>
                </select>
              </div>

              <div>Timber</div>
              <input type="number"
                name="Timber Input"
                id="favourite"
                placeholder="Timber quantity"
                value={timberQuantity}
                onChange={handleTimberQuantityChange}
                size="20"
              />

              <div>
                <select id="myList"
                  value={timberQuantityUnit}
                  onChange={handleTimberQuantityUnitChange} >
                  <option>kg</option>
                  <option>pounds</option>
                </select>
              </div>

              <div>Glass</div>
              <input type="number"
                name="Glass Input"
                id="favourite"
                placeholder="Glass quantity"
                value={glassQuantity}
                onChange={handleGlassQuantityChange}
                size="20"
              />

              <div>
                <select id="myList"
                  value={glassQuantityUnit}
                  onChange={handleGlassQuantityUnitChange} >
                  <option>kg</option>
                  <option>pounds</option>
                </select>
              </div>


              <button onClick={() => { createInput() }}>Calculate</button>
            </div>
          </div>
        </div>
        :
        <div>Please Log In</div>
      }
    </div>
  );
};
export default Inputs;