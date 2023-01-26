import React from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import { useLocation, useNavigate } from "@reach/router";

import "./Card.css";

/**
 * The card component displayed on the feed. Takes as props:
 * @param {string} project_name
 * @param {string} _id
 * @param {string} project_type
 * @param {string} creator_id
 * @param {string} location_city
 * @param {string} location_country
 * @param {string} picture
 * @param {string} emissions
 * @param {string} results_id
 * 
 */


const Card = (props) => {
  let navigate = useNavigate();
  const navigateResults = () => {
    navigate("/results", { state: { project_id: props.project_id, user_id: props.creator_id } })
  }
  
  return (
    <div className="flex-Container">
      <h1 className="Project-Name">{props.project_name}</h1>
      <div className="Card-Container">

        <div className="Project-Display">
          <div className="flex-items">{props.location_city}</div>
          <div className="flex-items">{props.location_country}</div>
        </div>
        <img className="Display-Pic" src={props.picture} />
        <button type="button" className="SeeMore-Button"  onClick={() => { navigateResults() }}>See More</button>
      </div>
    </div>

  );
};

export default Card;
