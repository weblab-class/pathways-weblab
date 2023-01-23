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
    <select id = "myList" onchange = "favTutorial()" >
                  <option> ---Select--- </option>
                  <option> table </option>
                  <option> chair </option>
                  <option> bed </option>
                  <option> fridge </option>
                  </select> 
                  
  </div>);
};

export default Dropdown;
