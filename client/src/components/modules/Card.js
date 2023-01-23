import React from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

import "./Card.css";

/**
 * The card component displayed on the feed. Takes as props:
 * @param {string} project_name
 * @param {string} project_id
 * @param {string} project_type
 * @param {string} creator_id
 * @param {string} creator_name
 * @param {string} location
 * @param {string} picture
 * @param {string} results
 */


const Card = (props) => {
  return (
    <div>
      <h1 className="Project-Name">{props.project_name}</h1>
      <div>
        <div className="Project-Box flex-Container">
          <div className="Project-Display">{props.location}</div>
          <div className="Project-Display">{props.results.emissions}</div>
          <div className="Project-Display">
            <img src={props.picture} alt="This is a nice image" />
          </div>
          <button type="button" className="SeeMore-Button">See More</button>
          </div>
        </div>
      </div>
    
  );
};

export default Card;
