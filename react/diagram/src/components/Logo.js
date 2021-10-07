import "./Logo.css";
import React from "react";
import * as SiIcons from "react-icons/si";

function Logo() {
  return (
    <div className="App-logo">
      <span className="App-logo-text">noaah</span>
      <SiIcons.SiProbot className="App-logo-img" size={30} color="white" />
    </div>
  );
}

export default Logo;
