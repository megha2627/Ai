import React from "react";
import { Sparkles, Bot, Brain, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen text-white flex flex-col justify-center items-center px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-md">
          Welcome to EntropyAI
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300 leading-relaxed">
          Experience the power of next-generation AI. Automate tasks, engage
          with smart chat, and get real-time insights — all in one place.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 md:px-0 mb-16">
        <FeatureCard
          icon={<Bot size={36} className="text-purple-400" />}
          title="Smart Chatbot"
          desc="A conversational AI that understands your context, answers instantly, and learns as you interact."
        />
        <FeatureCard
          icon={<Brain size={36} className="text-purple-400" />}
          title="AI Automation"
          desc="Set up intelligent workflows that simplify your daily work — from emails to reminders and beyond."
        />
        <FeatureCard
          icon={<MessageSquareText size={36} className="text-purple-400" />}
          title="Real-time Support"
          desc="Need help? Ask away and get real-time, smart, and context-aware assistance powered by advanced NLP."
        />
      </div>

      {/* Call to Action */}
      <Link
        to="/trial"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-lg"
      >
        <Sparkles className="animate-pulse" />
        Try EntropyAI Now — It’s Free!
      </Link>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">
    <div className="flex items-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300 text-sm">{desc}</p>
  </div>
);

export default Home;
