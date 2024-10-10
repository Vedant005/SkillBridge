import React, { useContext } from "react";
import { FilterContext } from "../contexts/filterContext";
import { useState } from "react";
function FreelancerFilter() {
  const { filterState, filterDispatch } = useContext(FilterContext); // Access filter state and dispatch from context
  // const [skillsInput, setSkillsInput] = useState("");
  // Handle changes and dispatch corresponding actions
  const handleLocationChange = (e) => {
    filterDispatch({ type: "FILTER_BY_LOCATION", payload: e.target.value });
  };

  const handleTimezoneChange = (e) => {
    filterDispatch({ type: "FILTER_BY_TIMEZONE", payload: e.target.value });
  };

  const handleCategoriesChange = (e) => {
    const categoriesArray = e.target.value.split(",");
    filterDispatch({ type: "FILTER_BY_CATEGORY", payload: categoriesArray });
  };

  const handleExperienceChange = (e) => {
    filterDispatch({ type: "FILTER_BY_EXPERIENCE", payload: e.target.value });
  };

  const handleRatingsChange = (e) => {
    filterDispatch({ type: "FILTER_BY_RATING", payload: e.target.value });
  };

  // const handleSkillsChange = (e) => {
  //   setSkillsInput(e.target.value);
  //   const skillsArray = e.target.value.split(",").map((skill) => skill.trim()); // split and trim skills
  //   filterDispatch({ type: "FILTER_BY_SKILLS", payload: skillsArray });
  // };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Location Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Location:</label>
        <input
          type="text"
          value={filterState.location} // controlled by the global context
          onChange={handleLocationChange}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter location"
        />
      </div>

      {/* Time Zone Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Time Zone:</label>
        <select
          value={filterState.timeZone} // controlled by the global context
          onChange={handleTimezoneChange}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Select Time Zone</option>
          <option value="GMT">GMT</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
          <option value="CST">CST</option>
        </select>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Categories:</label>
        <input
          type="text"
          value={filterState.categories.join(",")} // controlled by the global context
          onChange={handleCategoriesChange}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="E.g. Web Development, AI, Marketing"
        />
      </div>

      {/* Experience Level Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Experience Level:</label>
        <select
          value={filterState.experience} // controlled by the global context
          onChange={handleExperienceChange}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
        >
          <option value="">Select Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      {/* Ratings Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Ratings (0-5):</label>
        <input
          type="range"
          min="0"
          max="5"
          value={filterState.ratings} // controlled by the global context
          onChange={handleRatingsChange}
          className="w-full"
        />
        <div className="text-sm mt-2">{filterState.ratings} Stars</div>
      </div>

      {/* <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Skills:</label>
        <input
          type="text"
          value={skillsInput} // controlled by local state
          onChange={handleSkillsChange}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="E.g. JavaScript, React, Node.js"
        />
        <p className="text-sm text-gray-500 mt-2">
          Enter skills separated by commas.
        </p>
      </div> */}
    </div>
  );
}

export default FreelancerFilter;
