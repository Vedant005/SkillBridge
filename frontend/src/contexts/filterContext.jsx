import React, { createContext, useReducer } from "react";
import filterReducer from "../reducers/filterReducer";

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const initialFilterState = {
    location: "",
    experience: "",
    ratings: "",
    timeZone: "",
    categories: [],
  };

  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );

  // Filtering logic, using all filters from the state
  const filteredData = (data) => {
    return data
      .filter(
        (item) =>
          !filterState.location || item.location === filterState.location
      )
      .filter(
        (item) =>
          !filterState.experience || item.experience === filterState.experience
      )
      .filter(
        (item) => !filterState.ratings || item.ratings >= filterState.ratings
      )
      .filter(
        (item) =>
          !filterState.timeZone || item.timeZone === filterState.timeZone
      )
      .filter(
        (item) =>
          filterState.categories.length === 0 ||
          filterState.categories.includes(item.category)
      );
  };

  return (
    <FilterContext.Provider
      value={{ filterState, filterDispatch, filteredData }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
