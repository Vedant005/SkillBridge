import React from "react";

import Clientside from "../components/Clientside";
import FreelancerFilter from "../components/FreelancerFilter";
function Client() {
  return (
    <div className="flex m-9 gap-10">
      <div>
        <FreelancerFilter />
      </div>
      <div>
        <Clientside />
      </div>
    </div>
  );
}

export default Client;
