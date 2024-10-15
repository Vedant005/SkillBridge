import React, { useContext } from "react";
import { FilterGigsContext } from "../contexts/filterGigsContext";
function GigsFilter() {
  const { filterState, filterDispatch } = useContext(FilterGigsContext);

  // Dispatch filter actions when input changes
  const handleFilterChange = (field, value) => {
    filterDispatch({ type: `SET_${field.toUpperCase()}`, payload: value });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Hourly Rate Filter */}
      {/* <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Hourly Rate ($):</label>
        <input
          type="range"
          min="0"
          max="100"
          value={filterState.hourlyRate ? filterState.hourlyRate[1] : 100}
          onChange={(e) =>
            handleFilterChange("hourlyRate", [0, e.target.value])
          }
          className="w-full"
        />
        <div className="text-sm mt-2">
          ${filterState.hourlyRate ? filterState.hourlyRate[0] : 0} - $
          {filterState.hourlyRate ? filterState.hourlyRate[1] : 100} per hour
        </div>
      </div> */}

      {/* Title Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Title:</label>
        <input
          type="text"
          value={filterState.title || ""}
          onChange={(e) => handleFilterChange("title", e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter gig title"
        />
      </div>

      {/* Description Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Description:</label>
        <input
          type="text"
          value={filterState.description || ""}
          onChange={(e) => handleFilterChange("description", e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter gig description"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Category:</label>
        <select
          value={filterState.category || ""}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="App Development">App Development</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Price ($):</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={filterState.price ? filterState.price[1] : 1000}
          onChange={(e) => handleFilterChange("price", [0, e.target.value])}
          className="w-full"
        />
        <div className="text-sm mt-2">
          ${filterState.price ? filterState.price[0] : 0} - $
          {filterState.price ? filterState.price[1] : 1000} per project
        </div>
      </div>

      {/* Time Zone Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Time Zone:</label>
        <select
          value={filterState.timezone || ""}
          onChange={(e) => handleFilterChange("timezone", e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Select Time Zone</option>
          <option value="GMT">GMT</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
          <option value="CST">CST</option>
        </select>
      </div>

      {/* Experience Level Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Experience Level:</label>
        <select
          value={filterState.experienceLevel || ""}
          onChange={(e) =>
            handleFilterChange("experienceLevel", e.target.value)
          }
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Select Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
    </div>
  );
}

export default GigsFilter;
