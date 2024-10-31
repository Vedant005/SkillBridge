import React from "react";
import Clientside from "../components/Clientside";
import FreelancerFilter from "../components/FreelancerFilter";
import FilterProvider from "../contexts/filterContext";
function Client() {
  return (
    <FilterProvider>
      <div className="flex m-9 gap-10">
        <div>
          <FreelancerFilter />
        </div>
        <div className="flex-col">
          <Clientside />
        </div>
      </div>
    </FilterProvider>
  );
}

export default Client;
