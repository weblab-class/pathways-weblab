import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "@reach/router";
import "../../utilities.css";
import { get, post } from "../../utilities";
import "./Results.css";
import { Link } from "@reach/router";

//hardcoded units
const concrete_kgCO2_kgunit = 0.1034;
const glass_kgCO2_kgunit = 1.437;
const steel_kgCO2_kgunit = 3.02;
const timber_kgCO2_kgunit = 0.492;
const lbs_per_kg = 2.205;
const kg_per_lbs = 0.454;
let conc_total;
let glass_total;
let steel_total;
let timber_total;
let total_emissions_all;

const Results = (props) => {
  const [results, setResults] = useState(null);
  const [project, setProject] = useState([]);
  const locationfc = useLocation();
  const project_id_var = locationfc.state.project_id;
  const creator_id_var = locationfc.state.user_id;

  const createResults = () => {
    const body = {
      project_id: project_id_var,
      creator_id: creator_id_var,
      total_emissions: total_emissions_all,
      concrete_emissions: conc_total,
      glass_emissions: glass_total,
      steel_emissions: steel_total,
      timber_emissions: timber_total,
    }
    setResults(body)
    post("/api/results", body);
  };

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const calculateResults = (inputs) => {
    get("/api/results", { project_id: project_id_var }).then((resultsObj) => {
      if (resultsObj[0]) {
        setResults(resultsObj[0]);
      } else {
        const conc_quantity = inputs.materials.concrete.quantity;
        const conc_unit = inputs.materials.concrete.unit;

        const glass_quantity = inputs.materials.glass.quantity;
        const glass_unit = inputs.materials.glass.unit;

        const steel_quantity = inputs.materials.steel.quantity;
        const steel_unit = inputs.materials.steel.unit;

        const timber_quantity = inputs.materials.timber.quantity;
        const timber_unit = inputs.materials.timber.unit;

        //let conc_total;
        if ({ conc_unit } === "kg") {
          conc_total = conc_quantity * concrete_kgCO2_kgunit;
        } else {
          conc_total = conc_quantity * concrete_kgCO2_kgunit * kg_per_lbs;
        }


        //let steel_total;
        if ({ steel_unit } === "kg") {
          steel_total = steel_quantity * steel_kgCO2_kgunit;
        } else {
          steel_total = steel_quantity * steel_kgCO2_kgunit * kg_per_lbs;
        }

        //let timber_total;
        if ({ timber_unit } === "kg") {
          timber_total = timber_quantity * timber_kgCO2_kgunit;
        } else {
          timber_total = timber_quantity * timber_kgCO2_kgunit * kg_per_lbs;
        }

        //let glass_total;
        if ({ glass_unit } === "kg") {
          glass_total = glass_quantity * glass_kgCO2_kgunit;
        } else {
          glass_total = glass_quantity * glass_kgCO2_kgunit * kg_per_lbs;
        }

        total_emissions_all = glass_total + steel_total + conc_total + timber_total;
        

        createResults();

      };

    });

  };

  const getResults = () => {
    get("/api/results", { project_id: project_id_var }).then((resultsObj) => {
      setResults(resultsObj[0]);
    });
  };


  let navigate = useNavigate();
  const goBackToInput = () => {
    navigate("/inputs", { state: { project_id: project_id_var, user_id: creator_id_var } });
  };

  useEffect(() => {
    get("/api/inputs", { project_id: project_id_var }).then((inputObj) => {
      calculateResults(inputObj[0])
    })
  }, []);


  // Get the project information
  useEffect(() => {
    get("/api/project", { project_id: locationfc.state.project_id }).then((projectObj) => {
      setProject(projectObj[0])
    }); })


  return (
    <div>
      {
        (props.userId && results) ?
          <div className="ResultsBox">
            <h1 className = "ResultsHeader">Results</h1>
            <div className="HorizontalLine"></div>
            <div className="buttonsResults">
              <Link to="/projects/" className="Go-Back-Button">Back to Projects</Link>
              <button className="Go-Back-Button" onClick={() => { goBackToInput() }}>Change Inputs</button>
            </div>
            <div className="Info">
              <div> <img className="Display-Pic" src={project.picture} /></div>
              <div className = "Data">
                <h1>{project.project_name}</h1>
                <h2>Type: {project.project_type}</h2>
                <div><strong>Total Emissions:</strong> {formatter.format(results.total_emissions)} kg CO2</div>
                <div className="Each-Material"> <strong>Concrete-Emissions:</strong> {formatter.format(results.concrete_emissions)} kg CO2</div>
                <div className="Each-Material"><strong>Glass-Emissions: </strong>{formatter.format(results.glass_emissions)} kg CO2</div>
                <div className="Each-Material"><strong>Steel-Emissions:</strong> {formatter.format(results.steel_emissions)} kg CO2</div>
                <div className="Each-Material"><strong>Timber-Emissions:</strong> {formatter.format(results.timber_emissions)} kg CO2</div>
              </div>
            </div>
          </div>
          : (props.userId && project_id_var==="63d330ca1007a20f205f9d61") ?
          <div className="ResultsBox">
            <h1 className = "ResultsHeader">Template Results</h1>
            <div className="HorizontalLine"></div>
            <div className="buttonsResults">
              <Link to="/projects/" className="Go-Back-Button">Back to Projects</Link>
            </div>
            <div className="Info">
            <div> <img className="Display-Pic" src="https://cdn-images.article.com/products/SKU379A/2890x1500/image81730.jpg" /></div>
              <div className = "Data">
                <h1>Template</h1>
                <h2>Type: Table</h2>
                <div>Total Emissions: 0 kg CO2</div>
                <div className="Each-Material">Concrete-Emissions: 0 kg CO2</div>
                <div className="Each-Material">Glass-Emissions: 0 kg CO2</div>
                <div className="Each-Material">Steel-Emissions: 0 kg CO2</div>
                <div className="Each-Material">Timber-Emissions: 0 kg CO2</div>
              </div>
            </div>
          </div>
          : (props.userId) ?
          <div>
            <div className="ResultsBox">
              <h1 className = "ResultsHeader">Template Results</h1>
              <div className="HorizontalLine"></div>
              <div className="buttonsResults">
                <Link to="/projects/" className="Go-Back-Button">Back to Projects</Link>
                <button className="Go-Back-Button" onClick={() => { goBackToInput() }}>Change Inputs</button>
              </div>
              <div className="Info">
              <div> <img className="Display-Pic" src={project.picture} /></div>
                <div className = "Data">
                  <h1>{project.project_name}</h1>
                  <h2>Type: {project.project_type}</h2>
                  <div>Total Emissions: 0 kg CO2</div>
                  <div className="Each-Material">Concrete-Emissions: 0 kg CO2</div>
                  <div className="Each-Material">Glass-Emissions: 0 kg CO2</div>
                  <div className="Each-Material">Steel-Emissions: 0 kg CO2</div>
                  <div className="Each-Material">Timber-Emissions: 0 kg CO2</div>
                </div>
            </div>
          </div>
          </div>
          :
          <h1>Please log in!</h1>}
    </div>
  );
};

export default Results;