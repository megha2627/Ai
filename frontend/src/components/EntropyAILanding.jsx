import React from "react";
import { Sparkles, Bot, Brain, MessageSquareText } from "lucide-react";

const Home = () => {
  return (
    <div className="w-full min-h-screen text-white flex flex-col justify-center items-center px-6 pt-32 pb-20 relative overflow-hidden bg-transparent">
      {/* Enhanced Animated Glowing Backgrounds */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Primary glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-r from-blue-500/25 to-cyan-500/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-2/3 w-64 h-64 bg-gradient-to-r from-indigo-500/25 to-purple-500/25 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Secondary ambient glow */}
        <div className="absolute top-1/2 left-1/2 w-[50rem] h-[50rem] bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-3000 -translate-x-1/2 -translate-y-1/2"></div>

        {/* Moving gradient lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse delay-1500"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-300 shadow-lg shadow-purple-500/50"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce delay-700 shadow-lg shadow-blue-500/50"></div>
        <div className="absolute bottom-40 left-32 w-2.5 h-2.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce delay-1000 shadow-lg shadow-indigo-500/50"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-bounce delay-1500 shadow-lg shadow-purple-500/50"></div>

        {/* Additional floating elements */}
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-ping delay-2000"></div>
        <div className="absolute bottom-60 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-ping delay-2500"></div>
      </div>

      {/* Enhanced Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="relative">
          <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-cyan-400 drop-shadow-2xl mb-6 animate-pulse relative">
            Welcome to EntropyAI
          </h1>
          {/* Glowing text effect */}
          <div className="absolute inset-0 text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-cyan-400 blur-sm opacity-50 animate-pulse delay-500">
            Welcome to EntropyAI
          </div>
        </div>

        <div className="flex justify-center items-center mb-8">
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-4 animate-pulse shadow-lg shadow-purple-500/50"></div>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-lg"></div>
        </div>

        <p className="mt-8 text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 leading-relaxed backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl"></div>
          <span className="relative z-10 font-medium">
            Experience the power of next-generation AI. Automate tasks, engage
            with smart chat, and get real-time insights — all in one place.
          </span>
        </p>
      </div>

      {/* Enhanced Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-7xl px-4 md:px-0 mb-28 relative z-10">
        <FeatureCard
          icon={<Bot size={48} className="text-purple-400 drop-shadow-lg" />}
          title="Smart Chatbot"
          desc="A conversational AI that understands your context, answers instantly, and learns as you interact."
        />
        <FeatureCard
          icon={<Brain size={48} className="text-purple-400 drop-shadow-lg" />}
          title="AI Automation"
          desc="Set up intelligent workflows that simplify your daily work — from emails to reminders and beyond."
        />
        <FeatureCard
          icon={
            <MessageSquareText
              size={48}
              className="text-purple-400 drop-shadow-lg"
            />
          }
          title="Real-time Support"
          desc="Need help? Ask away and get real-time, smart, and context-aware assistance powered by advanced NLP."
        />
      </div>

      {/* Enhanced CTA Button */}
      <div className="relative z-10 mb-24">
        <div className="relative group">
          <button
            onClick={() => (window.location.href = "/trial")}
            className="group inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-6 px-14 rounded-full shadow-2xl hover:shadow-purple-500/30 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 text-xl border-2 border-white/30 hover:border-white/50 transform hover:scale-110 active:scale-95 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Sparkles className="animate-pulse group-hover:animate-spin transition-all duration-300 relative z-10" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100 relative z-10 font-black">
              Try EntropyAI Now — It's Free!
            </span>
          </button>

          {/* Enhanced glow effects */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 blur-xl animate-pulse scale-125 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-10 blur-2xl animate-pulse scale-150 pointer-events-none delay-1000"></div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/30 rounded-3xl shadow-2xl p-10 hover:scale-110 hover:shadow-purple-500/25 transition-all duration-500 hover:border-purple-400/60 relative overflow-hidden">
    {/* Enhanced background effects */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-blue-500/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

    <div className="relative z-10 flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg shadow-purple-500/20">
      {icon}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <h3 className="relative z-10 text-2xl font-black text-white mb-6 group-hover:text-purple-300 transition-colors duration-300">
      {title}
    </h3>

    <p className="relative z-10 text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300 font-medium">
      {desc}
    </p>

    {/* Subtle corner highlights */}
    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
);

export default Home;
