import React from "react";
import { Link } from "@reach/router";

import "./Dropdown.css";


/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Dropdown = (props) => {
  //   function favTutorial() {
  //     var mylist = document.getElementById("myList");
  //     document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
  //     }
  return (
    <div>
      <select id="myList"
        value={projectType}
        onChange={props.handleProjectTypeChange} >
        <option> ---Select--- </option>
        <option> Table </option>
        <option> Garden Pot </option>
        <option> Lamp </option>
        <option> Kitchen Appliance </option>
        <option> Backyard Shed </option>
      </select>

    </div>);
};

export default Dropdown;
