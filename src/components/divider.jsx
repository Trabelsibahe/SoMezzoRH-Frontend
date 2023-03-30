import React from "react";
import "../assets/styles/divider.css";

const DividerC = () => {
  return <Divider>Or</Divider>;
};

const Divider = ({ children }) => {
  return (
    <div className="container">
      <div className="border" />
      <span className="content">
        {children}
      </span>
      <div className="border" />
    </div>
  );
};

DividerC(<DividerC />, document.getElementById("root"));