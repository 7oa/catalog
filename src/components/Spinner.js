import React from "react";
import "../css/spinner.scss";

const Spinner = () => (
  <div className="spinner-wrapper">
    <div className="spinner">
      <img src="/img/loader.png" alt="loading..." />
    </div>
  </div>
);

export default Spinner;
