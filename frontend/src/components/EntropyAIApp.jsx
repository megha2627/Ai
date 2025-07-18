// At the top: same imports
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const EntropyAIApp = () => {
  const [currentView, setCurrentView] = useState("creator");
  const [selectedChatbotType, setSelectedChatbotType] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant powered by EntropyAI. I'm ready to help your customers with their queries. How can I assist you today?",
      isBot: true,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [remainingMessages, setRemainingMessages] = useState(5);

  useEffect(() => {
    const storedId = localStorage.getItem("company_id");
    if (storedId) setCompanyId(storedId);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      !["pdf", "docx", "txt", "csv"].includes(
        selectedFile.name.split(".").pop().toLowerCase()
      )
    ) {
      setErrorMsg("Only PDF, DOCX, TXT, or CSV files are allowed.");
      setFile(null);
    } else {
      setErrorMsg("");
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setErrorMsg("Please select a valid file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("company_id", companyId);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload-file",
        formData
      );
      setSuccessMsg(response.data.message);
      setErrorMsg("");
      setFile(null);
    } catch (error) {
      setErrorMsg("Failed to upload file.");
      setSuccessMsg("");
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateChatbot = () => {
    setCurrentView("preview");
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() && remainingMessages > 0) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isBot: false,
      };

      setMessages([...messages, newMessage]);
      setInputMessage("");
      setRemainingMessages(remainingMessages - 1);

      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thank you for your message! I'm here to help with any questions you have about our services.",
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
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

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <div className="rounded-xl shadow-lg p-8 space-y-10 border border-pink-500/20 bg-gray-900/60 backdrop-blur">
          {currentView === "creator" ? (
            <>
              <h2 className="text-3xl font-bold text-center text-pink-100 drop-shadow-sm">
                🚀 Free Trial – Create Your AI Chatbot
              </h2>

              {/* File Upload */}
              <div>
                <h3 className="text-xl font-semibold text-pink-100 mb-2">
                  Upload Your Business Files
                </h3>
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFileChange(e);
                  }}
                  className={`block w-full text-center border-2 border-dashed rounded-xl p-6 cursor-pointer transition ${
                    dragOver
                      ? "border-pink-500 bg-pink-900/30"
                      : "border-pink-300/30 bg-gray-800"
                  }`}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.docx,.txt,.csv"
                    className="hidden"
                  />
                  <div className="text-4xl mb-2">📁</div>
                  <p className="font-semibold">Click or Drag file here</p>
                  <p className="text-sm text-pink-200">
                    PDF, DOCX, TXT, CSV (Max 5MB)
                  </p>
                  {file && (
                    <p className="mt-2 text-green-400 text-sm">{file.name}</p>
                  )}
                  {errorMsg && (
                    <p className="mt-2 text-red-400 text-sm">{errorMsg}</p>
                  )}
                  {successMsg && (
                    <p className="mt-2 text-green-400 text-sm">{successMsg}</p>
                  )}
                </label>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`mt-4 w-full bg-gradient-to-r from-pink-200 to-fuchsia-600 py-3 rounded-lg font-semibold shadow-md ${
                    uploading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-blue-100 hover:to-fuchsia-700"
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload File"}
                </button>
                <p className="text-center text-sm text-pink-300 mt-2 italic">
                  File upload is optional
                </p>
              </div>

              {/* Chatbot Types */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-300">
                  Select Chatbot Type
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {chatbotTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedChatbotType(type.id)}
                      className={`p-4 rounded-xl transition text-left shadow-sm ${
                        selectedChatbotType === type.id
                          ? "border border-fuchsia-500 bg-pink-800"
                          : "border border-pink-300/20 hover:border-pink-400 hover:bg-pink-900/40"
                      }`}
                    >
                      <h4 className="font-bold text-white">{type.title}</h4>
                      <p className="text-sm text-pink-200">
                        {type.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateChatbot}
                className="w-full bg-gradient-to-r from-blue-200 to-fuchsia-600 py-3 rounded-xl text-lg font-semibold hover:from-pink-600 hover:to-fuchsia-700 transition shadow-lg"
              >
                Generate AI Chatbot
              </button>
            </>
          ) : (
            // Chatbot Preview Mode
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-pink-400">
                🎉 Your AI Chatbot Preview
              </h2>

              <div className="h-96 overflow-y-auto bg-gray-800 rounded-xl p-4 space-y-4 border border-pink-300/20">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${msg.isBot ? "text-left" : "text-right"}`}
                  >
                    <div
                      className={`inline-block px-4 py-3 rounded-xl max-w-xs ${
                        msg.isBot
                          ? "bg-pink-800/60 text-pink-100"
                          : "bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border border-pink-500/30 rounded-full bg-gray-900 text-white placeholder-pink-200 focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={remainingMessages === 0}
                  className="w-12 h-12 bg-gradient-to-tr from-pink-500 to-fuchsia-600 text-white rounded-full flex items-center justify-center text-xl hover:scale-105 transition disabled:opacity-50"
                >
                  →
                </button>
              </div>

              <div className="text-center text-sm text-pink-300">
                Trial Mode: {remainingMessages} messages remaining
              </div>

              <button className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-500 hover:from-fuchsia-700 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition shadow-md">
                Upgrade to Premium
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntropyAIApp;
