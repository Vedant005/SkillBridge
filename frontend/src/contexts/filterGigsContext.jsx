// src/context/FilterGigsContext.js
import React, { createContext, useReducer } from "react";
import filterGigsReducer from "../reducers/filterGigsReducer";

export const FilterGigsContext = createContext();

const FilterGigsProvider = ({ children }) => {
  const initialFilterState = {
    title: "",
    timePeriod: "",
    prize: "",
    experience: "",
    category: "",
  };

  const [filterState, filterDispatch] = useReducer(
    filterGigsReducer,
    initialFilterState
  );

  // Filtering logic, using all filters from the state
  const filteredGigs = (gigs) => {
    return gigs
      .filter(
        (gig) => !filterState.title || gig.title.includes(filterState.title)
      )
      .filter(
        (gig) =>
          !filterState.timePeriod || gig.timePeriod === filterState.timePeriod
      )
      .filter((gig) => !filterState.prize || gig.prize >= filterState.prize)
      .filter(
        (gig) =>
          !filterState.experience || gig.experience === filterState.experience
      )
      .filter(
        (gig) => !filterState.category || gig.category === filterState.category
      );
  };

  return (
    <FilterGigsContext.Provider
      value={{ filterState, filterDispatch, filteredGigs }}
    >
      {children}
    </FilterGigsContext.Provider>
  );
};

export default FilterGigsProvider;
