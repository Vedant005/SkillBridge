import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FilterContext } from "../contexts/filterContext";
function Clientside() {
  const { filteredData } = useContext(FilterContext); // Access filtered data from context
  const [freelancers, setFreelancers] = useState([]); // Hold the fetched freelancers

  // Fetch freelancer data from the backend
  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/client/freelence"
        );
        console.log(response.data);

        // Set the freelancers excluding those where isclient is true
        setFreelancers(response.data.data.filter((f) => !f.isclient));
      } catch (error) {
        console.error("Error fetching freelancer data", error);
      }
    };

    fetchFreelancerData();
  }, []);

  // Apply the filtering logic to the fetched data
  const filteredFreelancers = filteredData(freelancers);

  if (filteredFreelancers.length === 0) {
    return <div>Loading...</div>; // Loading state until the data is fetched and filtered
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredFreelancers.map((freelancer, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={freelancer.image || "https://via.placeholder.com/80"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {freelancer.username}
                </h2>
                <p className="text-gray-600 font-medium mt-1">
                  {freelancer.domain}
                </p>
                <div className="flex items-center gap-2 mt-1 text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span>{freelancer.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {/* <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Skills
              </h3> */}
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Description
              </h3> */}
              <p className="text-gray-600 leading-relaxed">
                {freelancer.description}
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-6 py-2.5 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
                onClick={() => alert("Succes")}
              >
                Hire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clientside;
