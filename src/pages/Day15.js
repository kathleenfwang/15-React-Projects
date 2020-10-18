import React from "react";
import {handleThemeToggle} from "../redux"
import { connect } from "react-redux";

const Day15 = ({ theme, handleThemeToggle}) => {
  console.log(theme)
  return (
    <div>
      <button onClick={handleThemeToggle}>+</button>
      <h4>Light Theme: {`${theme}`}</h4>
    </div>
  );
};

const mapStateToProps = state => {
  return { theme: state };
};

 

export default connect(
  mapStateToProps,
  {handleThemeToggle}
)(Day15);

  