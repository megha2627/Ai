import React, { useState } from "react";
import Navbar from "./Navbar";

const EntropyAIApp = () => {
  const [currentView, setCurrentView] = useState("creator");
  const [selectedChatbotType, setSelectedChatbotType] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm your AI assistant powered by EntropyAI. Ready to help your customers today!",
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [remainingMessages, setRemainingMessages] = useState(5);

  const handleGenerateChatbot = () => setCurrentView("preview");

  const handleSendMessage = () => {
    if (inputMessage.trim() && remainingMessages > 0) {
      const newMsg = {
        id: messages.length + 1,
        text: inputMessage,
        isBot: false,
      };
      setMessages((prev) => [...prev, newMsg]);
      setInputMessage("");
      setRemainingMessages((prev) => prev - 1);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "🤖 Thanks! How else can I assist?",
            isBot: true,
          },
        ]);
      }, 800);
    }
  };

  const chatbotTypes = [
    {
      id: "customer-service",
      title: "Customer Service",
      description: "Support & inquiries",
    },
    {
      id: "sales-assistant",
      title: "Sales Assistant",
      description: "Lead generation",
    },
    {
      id: "educational",
      title: "Educational",
      description: "Training & guides",
    },
    {
      id: "booking-system",
      title: "Booking System",
      description: "Appointments",
    },
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const containerClass = "min-h-screen text-white";
  const cardClass = "bg-zinc-680 border border-zinc-800 rounded-2xl shadow-xl";

  if (currentView === "preview") {
    return (
      <div className={containerClass}>
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 pt-24 pb-10">
          <div className={cardClass}>
            <div className="flex items-center justify-center py-5 border-b border-zinc-700">
              <h2 className="text-xl font-bold">Your AI Chatbot Preview</h2>
              <span className="ml-2 animate-bounce text-xl">✨</span>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-3 rounded-xl max-w-xs text-sm ${
                      msg.isBot
                        ? "bg-zinc-800 text-gray-100"
                        : "bg-indigo-600 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 px-4 py-3 border-t border-zinc-800">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={remainingMessages === 0}
                className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center"
              >
                ➤
              </button>
            </div>

            <div className="text-center text-sm text-gray-400 py-3 border-t border-zinc-800">
              <span className="font-semibold">Trial:</span> {remainingMessages}{" "}
              messages left
            </div>

            <div className="p-4">
              <button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-3 rounded-lg font-semibold transition">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-12">
        <div className={`${cardClass} p-8`}>
          <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Free Trial – Create Your AI Chatbot
          </h2>

          {/* File Upload */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-indigo-300 mb-3">
              📁 Upload Business Files (Optional)
            </h3>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                dragOver ? "border-indigo-400 bg-zinc-600" : "border-zinc-700"
              }`}
            >
              <p className="text-base font-medium">Drag & Drop Files Here</p>
              <p className="text-sm text-gray-400">
                Supports PDF, DOC, TXT (Max 5MB)
              </p>
            </div>
          </div>

          {/* Chatbot Type */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-indigo-300 mb-3">
              🤖 Choose Your Chatbot Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {chatbotTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedChatbotType(type.id)}
                  className={`p-5 rounded-xl border transition ${
                    selectedChatbotType === type.id
                      ? "border-indigo-500 bg-indigo-900"
                      : "border-zinc-700 hover:border-zinc-600"
                  }`}
                >
                  <h4 className="font-semibold text-white mb-1">
                    {type.title}
                  </h4>
                  <p className="text-sm text-gray-400">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateChatbot}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            🚀 Generate AI Chatbot
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntropyAIApp;
