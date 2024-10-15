import React from "react";

function GigsPage({ gigs }) {
  console.log(gigs);
  if (!gigs.length) {
    return <div>No gigs found.</div>; // Show message when no gigs match the filters
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {gigs.map((gig, index) => (
        <div
          key={index}
          className="w-full bg-white rounded-xl shadow-md overflow-hidden md:flex animate-fade-in"
        >
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={gig.image || "https://via.placeholder.com/150"} // Fallback in case image is missing
              alt="Gig"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {gig.cat}
            </div>
            <h2 className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {gig.title}
            </h2>
            <p className="mt-2 text-gray-500">{gig.des}</p>

            <div className="mt-4">
              <p className="text-gray-700">
                <span className="font-semibold">Level: </span> {gig.level}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Time Period: </span>{" "}
                {gig.timePriod}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Prize: </span> ${gig.prize}
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
                Apply Now
              </button>
              <span className="text-gray-500">In Demand</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GigsPage;
