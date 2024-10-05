import React from "react";
import GigsFilter from "../components/GigsFilter";
import Clientside from "../components/Clientside";
function Client() {
  return (
    <div>
      <div>
        <GigsFilter />
      </div>
      <div>
        <Clientside />
      </div>
    </div>
  );
}

export default Client;
