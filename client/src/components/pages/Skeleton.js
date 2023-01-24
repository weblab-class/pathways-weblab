import React from "react";
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Skeleton.css";

const GOOGLE_CLIENT_ID = "765537002064-fhpam2p9f5j2fq2725v6racrpi67r2pc.apps.googleusercontent.com";

const Skeleton = ({ userId, handleLogin, handleLogout }) => {
  return (
    // <img className="Map" src={mapstockphoto} alt="Map of Projects"></img>
    <div className="Skeleton">
      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
        autoPlay
        loop
        muted
      />
      <div className="homeBackground">
        <GoogleOAuthProvider
          clientId={"765537002064-fhpam2p9f5j2fq2725v6racrpi67r2pc.apps.googleusercontent.com"}
        ></GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Skeleton;
