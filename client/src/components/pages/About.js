import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./About.css";

import carbonDioxide from "../../public/carbonDioxide.jpg";
import earthDay from "../../public/earthDay.jpg";


const About = (props) => {
  return (
    <div className="AboutBox">
      <div className="About-Section">
        <h1 className="AboutTitle">About Us</h1>
        <div className="HorizontalLine"></div>
        <div className="About-page-pic">
          <p className="about-page-text">
            The Pathways team believes that all actions to reduce carbon emissions can make a noticable
            difference in the fight against climate change, and we are dedicated to providing our users
            with the information and tools they need to take action. By using our calculator, you can
            make informed decisions about your daily habits and contribute to a more sustainable future
            for all.
          </p>
          <img className="CO2" src={carbonDioxide} alt="Carbon Dioxide Emissions"></img>
        </div>
      </div>
      <div className="About-Section">
        <h1 className="AboutTitle">Our Carbon Emissions Calculator</h1>
        <div className="HorizontalLine"></div>
        <div className="About-page-pic">
          <p className="about-page-text">
            Our carbon emissions calculator is a tool that helps all people, from contractors to individuals, 
            understand their carbon footprint and help reduce the negative impact some materials have on the environment. By inputting
            information about their energy consumption and waste production users can get a clear picture of their carbon emissions 
            and take steps to live more sustainably.
          </p>
          <img className="CO2" src={earthDay} alt="Earth Day"></img>
        </div>
      </div>
    </div>
  );
};

export default About;
