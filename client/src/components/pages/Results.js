import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "@reach/router";
import { get, post } from "../../utilities";
import "../../utilities.css";
import "./Results.css";
import { Link } from "@reach/router";

//hardcoded units
const concrete_kgCO2_kgunit = 0.1034;
const glass_kgCO2_kgunit = 1.437;
const steel_kgCO2_kgunit = 3.02;
const timber_kgCO2_kgunit = 0.492;
const lbs_per_kg = 2.205;
const kg_per_lbs = 0.454;
const conc_total = 0;
const glass_total = 0;
const steel_total = 0;
const timber_total = 0;
const total_emissions_all = 0;

const Results = (props) => {
  const [inputs, setInputs] = useState([]);
  const locationfc = useLocation();
  const project_id_var = locationfc.state.project_id;
  const creator_id_var = locationfc.state.user_id;

  useEffect(() => {
    get("/api/inputs", { project_id: project_id_var }).then((inputObj) => {
      setInputs(inputObj[0]);
    });
  }, [])

  const conc_quantity= inputs.materials.concrete.quantity;
  const conc_unit= inputs.materials.concrete.unit;
  
  const glass_quantity= inputs.materials.glass.quantity;
  const glass_unit= inputs.materials.glass.unit;

  const steel_quantity= inputs.materials.steel.quantity;
  const steel_unit= inputs.materials.steel.unit;

  const timber_quantity= inputs.materials.steel.quantity;
  const timber_unit= inputs.materials.steel.unit;

  
  useEffect(() => {
    if ({conc_unit} === "kg"){
      conc_total = conc_quantity*concrete_kgCO2_kgunit;
    } else {
      conc_total = conc_quantity*concrete_kgCO2_kgunit*kg_per_lbs;
    }
    if ({steel_unit} === "kg"){
      steel_total = steel_quantity*steel_kgCO2_kgunit;
    } else {
      steel_total = steel_quantity*steel_kgCO2_kgunit*kg_per_lbs;
    }
    if ({timber_unit} === "kg"){
      timber_total = timber_quantity*timber_kgCO2_kgunit;
    } else {
      steel_total = timber_quantity*timber_kgCO2_kgunit*kg_per_lbs;
    }
    if ({glass_unit} === "kg"){
      glass_total = glass_quantity*glass_kgCO2_kgunit;
    } else {
      glass_total = glass_quantity*glass_kgCO2_kgunit*kg_per_lbs;
    }
   
  }, [inputs])
  
  useEffect(() => {
    //total emissions
    total_emissions_all = glass_total + steel_total + conc_total + timber_total;
  }, [conc_total, glass_total, steel_total, timber_total])
  
  
  useEffect(() => {
    //const createResults = () => {
      const body = {
        project_id: project_id_var,
        creator_id: creator_id_var,
        total_emissions: total_emissions_all,
        concrete_emissions: conc_total,
        glass_emissions: glass_total,
        steel_emissions: steel_total,
        timber_emissions: timber_total,
        }
        post("/api/results", body)
      //};
  }, [total_emissions_all])


  return (
    <div>
      {
        creator_id_var ? 
        <div>
          <h1>Results</h1>
          <p> This is the results section. </p>
          <Link to="/projects/" className="Go-Back-Button">Back</Link>
          <div>Total Emissions: {total_emissions_all} kg CO2</div>
          <div className="Each-Material">Concrete-Emissions: {conc_total} kg CO2</div>
          <div className="Each-Material">Glass-Emissions: {glass_total} kg CO2</div>
          <div className="Each-Material">Steel-Emissions: {steel_total} kg CO2</div>
          <div className="Each-Material">Timber-Emissions: {timber_total} kg CO2</div>
        </div>
        :
        <h1>Please log in!</h1>}
    </div>
  );
};

export default Results;