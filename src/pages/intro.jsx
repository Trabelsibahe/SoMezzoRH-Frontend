import React from "react";
import "../assets/styles/intro.css";
import logo from "../assets/images/logo1_blanc.png";

function SplashScreen() {
  return (
    <div className="splash_page">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title">
        <span> 
          <img className="splash_logo" src={logo} alt="SoMezzoRH"></img>
       </span>
        <br />
        <p className="splash_text">Merci de patienter</p>
        <br />
        <span>
        <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </span>
      </div>
    </div>
  );
}

export default SplashScreen;
