import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FreeTrialForm = () => {
  const [formData, setFormData] = useState({
    domain_name: "",
    tone: "",
    custom_tone: "",
    company_description: "",
    chatbot_expectations: "",
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/free-trial",
        formData
      );

      // ✅ Save company_id in localStorage
      const companyId = response.data.company_id;
      if (companyId) {
        localStorage.setItem("company_id", companyId);
      }

      setMessage(response.data.message);
      setFormData({
        domain_name: "",
        tone: "",
        custom_tone: "",
        company_description: "",
        chatbot_expectations: "",
      });

      // ✅ Optional: delay navigation to let user see the success message
      setTimeout(() => navigate("/chatbot"), 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-12">
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-10 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          🚀 Start Your Free Trial
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Fill out the details below to get started with your personalized AI
          chatbot.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-200">
              Company Domain Name
            </label>
            <input
              type="text"
              name="domain_name"
              value={formData.domain_name}
              onChange={handleChange}
              placeholder="e.g. example.com"
              required
              className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-200">
              Preferred Tone
            </label>
            <select
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Tone</option>
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-200">
              Custom Tone (Optional)
            </label>
            <input
              type="text"
              name="custom_tone"
              value={formData.custom_tone}
              onChange={handleChange}
              placeholder="e.g. witty, empathetic"
              className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-200">
              Company Description
            </label>
            <textarea
              name="company_description"
              value={formData.company_description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Tell us about your company"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-gray-200">
              Chatbot Expectations
            </label>
            <textarea
              name="chatbot_expectations"
              value={formData.chatbot_expectations}
              onChange={handleChange}
              required
              rows={3}
              className="w-full mt-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="What do you expect from your chatbot?"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded-xl font-semibold text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Start Free Trial"}
          </button>

          {message && (
            <p className="text-center text-green-400 font-medium mt-3">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FreeTrialForm;
