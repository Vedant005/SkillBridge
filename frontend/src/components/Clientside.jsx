import React, { useState, useEffect } from "react";
import axios from "axios";

function Clientside() {
  const [freelancers, setFreelancers] = useState([]); // Changed to an array for multiple freelancers

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

  if (freelancers.length === 0) {
    return <div>Loading...</div>; // Loading state until the data is fetched
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md space-y-6">
      {freelancers.map((freelancer, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <img
              src={freelancer.image || "https://via.placeholder.com/80"}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{freelancer.username}</h2>
              <p className="text-gray-600">{freelancer.domain}</p>
              <p className="text-gray-500">{freelancer.location}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-gray-600">{freelancer.description}</p>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Wishlist
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Hire
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Clientside;
