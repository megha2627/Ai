import React from "react";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-indigo-400 text-center mb-16 drop-shadow-[0_0_20px_rgba(129,140,248,0.5)]">
          About Us
        </h2>

        {/* Intro Paragraph */}
        <p className="text-lg md:text-xl text-gray-300 mb-14 max-w-3xl mx-auto leading-relaxed text-center">
          At EntropyAI, we are passionate about revolutionizing the way
          businesses interact with technology. Founded with a vision to harness
          the power of artificial intelligence, our mission is to empower
          companies with intelligent chatbots, automated websites, and seamless
          integrations tailored to their unique needs.
        </p>

        {/* Sections */}
        {[
          {
            title: "Our Story",
            content:
              "EntropyAI was born from a simple idea: to make AI accessible and impactful for every business. Starting as a small team of innovators, we’ve grown into a trusted partner for companies worldwide, delivering cutting-edge solutions that save time and enhance customer experiences.",
          },
          {
            title: "Our Mission",
            content:
              "Our mission is to simplify complex technologies and provide customizable AI tools that drive growth. We believe in creating solutions that are not just innovative but also user-friendly, ensuring every business can thrive in the digital age.",
          },
          {
            title: "Our Team",
            content:
              "Our team consists of AI experts, developers, and designers who are dedicated to pushing the boundaries of what’s possible. With diverse skills and a shared passion for technology, we work tirelessly to bring your vision to life.",
          },
        ].map((section, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-12 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-cyan-300 mb-4">
              {section.title}
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              {section.content}
            </p>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Join Us Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
