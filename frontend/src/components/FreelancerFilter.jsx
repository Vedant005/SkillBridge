import React, { useState } from "react";

function FreelancerFilter({ onFilterChange }) {
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [categories, setCategories] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [ratings, setRatings] = useState(0);

  // Handle filter change
  const handleFilterChange = () => {
    onFilterChange({
      location,
      timezone,
      categories,
      experienceLevel,
      ratings,
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Location Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            handleFilterChange();
          }}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter location"
        />
      </div>

      {/* Time Zone Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Time Zone:</label>
        <select
          value={timezone}
          onChange={(e) => {
            setTimezone(e.target.value);
            handleFilterChange();
          }}
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
          value={categories}
          onChange={(e) => {
            setCategories(e.target.value.split(","));
            handleFilterChange();
          }}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="E.g. Web Development, AI, Marketing"
        />
      </div>

      {/* Experience Level Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Experience Level:</label>
        <select
          value={experienceLevel}
          onChange={(e) => {
            setExperienceLevel(e.target.value);
            handleFilterChange();
          }}
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
          value={ratings}
          onChange={(e) => {
            setRatings(e.target.value);
            handleFilterChange();
          }}
          className="w-full"
        />
        <div className="text-sm mt-2">{ratings} Stars</div>
      </div>
    </div>
  );
}

export default FreelancerFilter;
