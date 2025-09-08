import React from "react";
import { useOutletContext } from "react-router-dom";

const HostDetails = () => {
  const van = useOutletContext();

  return (
    <div className="p-5 flex flex-col gap-2">
      <div>
        <b>Name: </b>
        {van.name}
      </div>
      <div>
        <b>Category: </b>
        {String(van.type).charAt(0).toUpperCase() + String(van.type).slice(1)}
      </div>
      <div>
        <b>Description: </b>
        {van.description}
      </div>
      <div>
        <b>Visibility: </b>Public
      </div>
    </div>
  );
};

export default HostDetails;
