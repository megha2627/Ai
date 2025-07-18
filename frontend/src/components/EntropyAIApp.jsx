import React, { useState } from "react";
import axios from "axios";
import { UploadCloud } from "lucide-react"; // optional icon for flair

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const companyId = localStorage.getItem("company_id");
    if (!companyId) {
      alert("Company ID not found in localStorage");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("company_id", companyId);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload-file",
        formData
      );
      setResponse(res.data.chatbot_response);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        alert("Upload failed: " + err.response.data.error);
      } else {
        alert("Upload failed. Check console for more info.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-black">
      <div className="rounded-2xl shadow-2xl p-8 max-w-xl w-full bg-white">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">
          <UploadCloud className="inline-block mr-2 mb-1" />
          Upload & Analyze File
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select your document:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 rounded bg-gray-100 text-black border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 py-2 rounded-lg font-semibold text-white shadow-md"
        >
          Upload & Get Insights
        </button>

        {response && (
          <div className="mt-6 bg-gray-100 text-black p-4 rounded-lg border border-gray-300">
            <h3 className="font-bold text-lg mb-2">ChatGPT Response:</h3>
            <p className="whitespace-pre-line">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
