import React from "react";

const Footer = (props) => {
  return (
    <div>
      <p>Footer</p>
      <p>Brought to you by {props.companyTitle}</p>
    </div>
  );
};

export default Footer;
