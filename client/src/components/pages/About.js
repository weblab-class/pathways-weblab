import React, { useState, useEffect, useRef } from "react";
import "../../utilities.css";
import "./About.css";

const About = (props) => {
  return (
    <div className="about-page-container">
      <h1 className="about-page-title">About Our Carbon Emissions Calculator</h1>
      <p className="about-page-text">
        Our carbon emissions calculator is a tool that helps all people, from contractors to
        individuals, understand their carbon footprint and identify areas where they can make
        changes to their used materials to reduce their impact on the environment. By inputting
        information about their energy consumption, transportation methods, and waste production,
        users can get a clear picture of their carbon emissions and take steps to live more
        sustainably.
      </p>
      <p className="about-page-text">
        Pathways believes that all actions to reduce carbon emissions can make a noticable
        difference in the fight against climate change, and we are dedicated to providing our users
        with the information and tools they need to take action. By using our calculator, you can
        make informed decisions about your daily habits and contribute to a more sustainable future
        for all.
      </p>
    </div>
  );
};

export default About;
