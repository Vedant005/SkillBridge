import React, { useState } from "react";

function GigsFilter({ onFilterChange }) {
  const [hourlyRate, setHourlyRate] = useState([0, 100]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState([0, 1000]);
  const [timezone, setTimezone] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  // Handle filter change
  const handleFilterChange = () => {
    onFilterChange({
      hourlyRate,
      title,
      description,
      category,
      price,
      timezone,
      experienceLevel,
    });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg space-y-6">
      {/* Hourly Rate Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Hourly Rate ($):</label>
        <input
          type="range"
          min="0"
          max="100"
          value={hourlyRate[1]}
          onChange={(e) => {
            setHourlyRate([0, e.target.value]);
            handleFilterChange();
          }}
          className="w-full"
        />
        <div className="text-sm mt-2">
          ${hourlyRate[0]} - ${hourlyRate[1]} per hour
        </div>
      </div>

      {/* Title Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleFilterChange();
          }}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter gig title"
        />
      </div>

      {/* Description Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            handleFilterChange();
          }}
          className="border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-emerald-400"
          placeholder="Enter gig description"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-col">
        <label className="text-lg font-medium mb-2">Category:</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterChange();
          }}
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
          value={price[1]}
          onChange={(e) => {
            setPrice([0, e.target.value]);
            handleFilterChange();
          }}
          className="w-full"
        />
        <div className="text-sm mt-2">
          ${price[0]} - ${price[1]} per project
        </div>
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
    </div>
  );
}

export default GigsFilter;
