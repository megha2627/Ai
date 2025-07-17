import React, { useState, useEffect } from "react";
import { UploadCloud } from "lucide-react";
import axios from "axios";

const UploadBox = () => {
  const [file, setFile] = useState(null);
  const [companyId, setCompanyId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("company_id");
    if (storedId) setCompanyId(storedId);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      !["pdf", "docx", "txt"].includes(
        selectedFile.name.split(".").pop().toLowerCase()
      )
    ) {
      setErrorMsg("Only PDF, DOCX, or TXT files are allowed.");
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Upload File
        </h2>

        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:bg-gray-50 transition"
        >
          <UploadCloud className="w-10 h-10 text-gray-500 mb-2" />
          <p className="text-gray-600">Click to upload your file</p>
          <p className="text-xs text-gray-400 mt-1">
            Only PDF, DOCX, or TXT files allowed
          </p>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.docx,.txt"
          />
        </label>

        {file && (
          <p className="mt-3 text-sm text-green-600 font-medium">{file.name}</p>
        )}

        {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}
        {successMsg && (
          <p className="mt-2 text-sm text-green-600">{successMsg}</p>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-6 w-full py-2 rounded-lg text-white font-semibold transition ${
            uploading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadBox;
