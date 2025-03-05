import React, { useState } from "react"

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Data Submitted:", formData)
    alert("Thank you for contacting us! We'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" }) // Reset form
  }

  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      description: "Visionary leader with a passion for innovation.",
      social: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
      },
    },
    {
      name: "Jane Smith",
      role: "Lead Developer",
      description: "Full-stack developer with a love for clean code.",
      social: {
        github: "https://github.com/janesmith",
        linkedin: "https://linkedin.com/in/janesmith",
        twitter: "https://twitter.com/janesmith",
      },
    },
    {
      name: "Alice Johnson",
      role: "UI/UX Designer",
      description: "Creative designer focused on user experience.",
      social: {
        github: "https://github.com/alicejohnson",
        linkedin: "https://linkedin.com/in/alicejohnson",
        twitter: "https://twitter.com/alicejohnson",
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-xl text-gray-300 mt-4">
          We are a passionate team building innovative solutions to solve
          real-world problems.
        </p>
      </div>

      {/* Projects Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Project Alpha",
              description: "A cutting-edge AI platform for developers.",
              link: "https://github.com/project-alpha",
            },
            {
              title: "Project Beta",
              description: "A collaborative tool for remote teams.",
              link: "https://github.com/project-beta",
            },
            {
              title: "Project Gamma",
              description: "An open-source library for data visualization.",
              link: "https://github.com/project-gamma",
            },
          ].map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors duration-300"
            >
              <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
              <p className="text-purple-400 mb-2">{member.role}</p>
              <p className="text-gray-300 mb-4">{member.description}</p>
              <div className="flex gap-4">
                <a
                  href={member.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  GitHub
                </a>
                <a
                  href={member.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                >
                  Twitter
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/company/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://yourportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
          >
            Portfolio
          </a>
        </div>
      </div>

      {/* Contact Us Form */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-300 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              rows="5"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}

export default AboutUs
