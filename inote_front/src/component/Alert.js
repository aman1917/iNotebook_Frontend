import React from "react";

const Alert = (props) => {
    // setTimeout(() => {
    //     {props.message}
    //  }, 2000);
  return (
    <div className="alert alert-primary" role="alert">
       {props.message}
    </div>
  );
};

export default Alert;
