import React from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

import "./Card.css";

/**
 * The card component displayed on the feed. Takes as props:
 * @param {string} project_name
 * @param {string} _id
 * @param {string} project_type
 * @param {string} creator_id
 * @param {string} location
 * @param {string} picture
 * @param {string} emissions
 * @param {string} results_id
 * 
 */


const Card = (props) => {
  return (
    <div className="flex-Container">
      <h1 className="Project-Name">{props.project_name}</h1>
        <div className="Card-Container">
  
          <div className="Project-Display">
            <div className = "flex-items">{props.location}</div>
            <div className = "flex-items">{props.emissions}</div>
          </div>
          <img className="Display-Pic" src={props.picture} />
          <Link to="/results/" className="SeeMore-Button">See More</Link>
        </div>
    </div>
    
  );
};

export default Card;
