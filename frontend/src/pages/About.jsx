import React from "react";

function About() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-20 px-10 text-white">
      <div className="container mx-auto text-center">
        {/* Section title */}
        <h1 className="text-4xl font-bold mb-6 animate-fade-in">
          Welcome to <span className="text-yellow-400">SkillBridge</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg mb-10 animate-slide-in">
          Connecting top-tier freelancers with world-class clients to create
          solutions that matter.
        </p>

        {/* Flex content */}
        <div className="flex flex-wrap justify-center items-center space-y-6">
          {/* Mission statement */}
          <div className="w-full md:w-5/12 p-6 ">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="leading-relaxed">
              At SkillBridge, we empower freelancers by providing them with a
              platform to showcase their skills, connect with clients, and grow
              their careers. Our mission is to create an ecosystem where quality
              work meets flexibility and opportunity.
            </p>
          </div>

          {/* Core values with icons */}
          <div className="w-full md:w-5/12 p-6  delay-200">
            <h2 className="text-2xl font-bold mb-4">Core Values</h2>
            <ul className="space-y-4 text-left">
              <li>
                <span className="text-yellow-300">🚀 Innovation:</span> Pushing
                boundaries and embracing new ideas.
              </li>
              <li>
                <span className="text-yellow-300">🌟 Excellence:</span>{" "}
                Providing world-class service for all projects.
              </li>
              <li>
                <span className="text-yellow-300">🤝 Collaboration:</span>{" "}
                Bringing freelancers and clients together seamlessly.
              </li>
              <li>
                <span className="text-yellow-300">💡 Growth:</span> Fostering
                continuous learning and development.
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 animate-fade-up">
          <a
            href="/join-us"
            className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-semibold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105"
          >
            Join the Movement
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
