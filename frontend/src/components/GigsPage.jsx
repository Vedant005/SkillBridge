import React, { useState, useEffect } from "react";
import axios from "axios";

function GigsPage() {
  // const [gigData, setGigData] = useState(null);

  // Fetch gig data from backend
  useEffect(() => {
    const fetchGigData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/job/alljobs"); // Change this URL to your backend API endpoint
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching gig data", error);
      }
    };

    fetchGigData();
  }, []);

  // if (!gigData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg space-y-4">
      <h1>hello</h1>
    </div>
  );
}

export default GigsPage;
