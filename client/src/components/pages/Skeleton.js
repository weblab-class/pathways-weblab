import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";

import mapstockphoto from "../../public/mapstockphoto.png";

const GOOGLE_CLIENT_ID = "765537002064-fhpam2p9f5j2fq2725v6racrpi67r2pc.apps.googleusercontent.com";

const BackgroundColor = "#1f8f3d";
const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    <div className="homeBackground">
      <GoogleOAuthProvider
        clientId={"765537002064-fhpam2p9f5j2fq2725v6racrpi67r2pc.apps.googleusercontent.com"}
      >
        <img className="Map" src={mapstockphoto} alt="Map of Projects"></img>
      </GoogleOAuthProvider>
    </div>
  );
};

export default Skeleton;