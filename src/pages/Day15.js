import React from "react";
import {handleThemeToggle} from "../redux"
import { connect } from "react-redux";

const Day15 = ({ theme, handleThemeToggle}) => {
  const divStyle = {
    backgroundColor:"green",
    width:300,
    height:300
  }
 
  return (
    <div>
      <h1>REDUX LIGHT/DARK THEME PRACTICE</h1>
      <button onClick={handleThemeToggle}>+</button>
      <h4>Light Theme: {`${theme}`}</h4>
      <div className ="center" style ={divStyle}>
      <p>Text: <span class="spoiler fadein fadeout"><span>E.T. phones home.</span></span></p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { theme: state.state};
};

 

export default connect(
  mapStateToProps,
  {handleThemeToggle}
)(Day15);

  