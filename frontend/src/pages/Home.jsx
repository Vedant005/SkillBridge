import React from "react";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("popular");
  const categories = [
    { id: "popular", label: "Popular", icon: "📈" },
    { id: "graphic-design", label: "Graphic Design" },
    { id: "virtual-assistance", label: "Virtual Assistance" },
    { id: "video-animation", label: "Video & Animation" },
    { id: "web-dev", label: "Web Dev" },
    { id: "ai-ml", label: "AI & ML" },
  ];

  const talents = [
    {
      id: 1,
      name: "Umer A.",
      title:
        "2D Animation, Motion Graphics, App, Screencast, Gif & Web Animator",
      image: "/api/placeholder/80/80",
      hourlyRate: 15,
      jobSuccess: 91,
      isAvailable: true,
      skills: ["2D Animation", "Explainer Video", "Video Production"],
    },
    {
      id: 2,
      name: "Parth L.",
      title:
        "AI/ML Specialist | Full-Stack Development | Generative AI | Python",
      image: "/api/placeholder/80/80",
      hourlyRate: 30,
      jobSuccess: 100,
      skills: ["Python", "Natural Language Processing", "Data Science"],
    },
    // Add more talent data as needed
  ];

  const services = [
    {
      title: "Website Development",
      imgSrc: "/path/to/website-development-image.png",
      bgColor: "bg-green-800",
    },
    {
      title: "Logo Design",
      imgSrc: "/path/to/logo-design-image.png",
      bgColor: "bg-orange-500",
    },
    {
      title: "SEO",
      imgSrc: "/path/to/seo-image.png",
      bgColor: "bg-green-900",
    },
    {
      title: "Architecture & Interior Design",
      imgSrc: "/path/to/architecture-interior-design-image.png",
      bgColor: "bg-purple-800",
    },
    {
      title: "Social Media Marketing",
      imgSrc: "/path/to/social-media-marketing-image.png",
      bgColor: "bg-lime-700",
    },
    {
      title: "Voice Over",
      imgSrc: "/path/to/voice-over-image.png",
      bgColor: "bg-amber-800",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section with Green Background */}
      <div className="flex justify-center px-4 py-12">
        <div className="w-full max-w-6xl bg-green-800 rounded-lg p-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-8">
              Find the right{" "}
              <span className="text-emerald-400 font-serif italic">
                freelance
              </span>{" "}
              service
              <br /> right away
            </h1>

            {/* Search Bar */}
            <div className="flex max-w-2xl mx-auto mb-12">
              <input
                type="text"
                placeholder="What are you looking for? E.g. Mobile Apps"
                className="flex-1 py-3 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button className="bg-emerald-400 text-white px-6 rounded-r-md hover:bg-emerald-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>

            {/* Trusted By Section */}
            <div className="text-white">
              <p className="text-sm mb-4 opacity-90">Trusted by :</p>
              <div className="flex justify-center items-center space-x-8">
                {["OMG REVIEWS", "Google", "NETFLIX", "PayPal", "P&G"].map(
                  (company, index) => (
                    <div
                      key={index}
                      className="text-white font-bold opacity-90"
                    >
                      {company}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Services Section */}
      <div className="container mx-auto px-24 m-10">
        <h1 className="text-3xl md:text-6xl font-serif text-green-600 mb-8 m-10">
          Popular services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 m-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg ${service.bgColor}`}
            >
              <h2 className="text-white font-bold text-lg mb-4">
                {service.title}
              </h2>
              <img
                src={service.imgSrc}
                alt={service.title}
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="mb-8">
          <p className="text-green-700 font-medium mb-2">LOOKING TO HIRE?</p>
          <h2 className="text-4xl font-bold text-gray-900">
            Explore top talent
          </h2>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full border transition-all ${
                activeCategory === category.id
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-600"
              }`}
            >
              {category.icon && <span className="mr-1">{category.icon}</span>}
              {category.label}
            </button>
          ))}
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {talents.map((talent) => (
            <div
              key={talent.id}
              className="p-6 border border-gray-200 bg-slate-100 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    {talent.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{talent.title}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gray-900 font-medium">
                      ${talent.hourlyRate}/hr
                    </span>
                    <div className="flex items-center text-gray-600">
                      <span className="inline-block w-4 h-4 mr-1 text-blue-500">
                        ⭐
                      </span>
                      {talent.jobSuccess}% Job Success
                    </div>
                    {talent.isAvailable && (
                      <span className="inline-flex items-center text-blue-600 text-sm">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-1"></span>
                        Available now
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {talent.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ml-4">
                  <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
