import React from "react";
import GigsFilter from "../components/GigsFilter";
import GigsPage from "../components/GigsPage";
function Freelancer() {
  return (
    <div className="flex  m-9">
      <div>
        <GigsFilter />
      </div>
      <div>
        <GigsPage />
      </div>
    </div>
  );
}

export default Freelancer;
