import React from "react";
import { Link } from "@reach/router";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "765537002064-fhpam2p9f5j2fq2725v6racrpi67r2pc.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">PATHWAYS</div>
      <div className="NavBar-linkContainer">
        <Link to="/" className="NavBar-link">
          Home
        </Link>
        <Link to="/about/" className="NavBar-link">
          About
        </Link>
        <Link to="/projects/" className="NavBar-link">
          Projects
        </Link>
          <GoogleOAuthProvider clientId={"765537002064-fhpam2p9f5j2fq2725v6racrpi67r2pc.apps.googleusercontent.com"}>
          {props.userId ? (
            <button
              onClick={() => {
                googleLogout();
                props.handleLogout();
              }}
            >
              Logout
            </button>
          ) : (
            <GoogleLogin onSuccess={props.handleLogin} onError={(err) => console.log(err)} text={"signin"} size={"large"} shape={"circle"} />
          )}
        </GoogleOAuthProvider>
        
      </div>
    </nav>
  );
};

export default NavBar;
