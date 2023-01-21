import React from "react";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "./Card.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "765537002064-fhpam2p9f5j2fq2725v6racrpi67r2pc.apps.googleusercontent.com";

/**
 * The card component displayed on the feed. Takes as props:
 * @param {string} project_name
 * @param {string} location
 */


const Card = (props) => {
  return (
    <div>
      <h1 className="">{props.project_name}</h1>
      <div>
        <div className="flex-Container">
          <div className="">{props.location}</div>
          <div className="">{props.results.emissions}</div>
          <div>
            <img src="" alt="This is a nice image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
