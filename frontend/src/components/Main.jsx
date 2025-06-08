import { useState } from "react";

const API_URL = "https://uwodwebbackend.onrender.com";

const Main = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [noObjectsMessage, setNoObjectsMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setSnackbarMessage("Please select a valid sonar image file.");
        setSnackbarOpen(true);
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDetectionResults(null);
      setNoObjectsMessage(null);
      setError(null);
    }
  };

  const handleDetection = async () => {
    if (!selectedImage) {
      setError("Please select a sonar image first");
      return;
    }

    setLoading(true);
    setError(null);
    setDetectionResults(null);
    setNoObjectsMessage(null);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch(`${API_URL}/api/detect`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Detection failed");
      }

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      if (data.message?.includes("No objects detected")) {
        setNoObjectsMessage(data.message);
        setDetectionResults([]);
      } else {
        setDetectionResults(data);
      }
    } catch (err) {
      setError(err.message || "Failed to process sonar image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-white py-12 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">

        {/* Banner */}
        <div className="bg-[#161B22] rounded-xl p-10 text-center shadow-xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 font-orbitron tracking-wide">
            Unveiling the Depths
          </h1>
          <p className="mt-3 text-gray-300 text-lg md:text-xl max-w-xl mx-auto">
            Detect Objects with Precision in Sonar Images
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-[#1C2128] rounded-xl p-8 shadow-lg border border-[#30363D]">
          <h2 className="text-2xl font-semibold text-cyan-300 text-center mb-6">
            Sonar Object Detection
          </h2>

          <div className="flex justify-center mb-8">
            <label
              htmlFor="image-upload"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-7 py-3 rounded-lg font-semibold cursor-pointer transition duration-300"
            >
              Upload Sonar Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {previewUrl && (
            <div className="text-center mb-8">
              <img
                src={previewUrl}
                alt="Sonar Preview"
                className="mx-auto max-h-96 rounded-xl border-4 border-cyan-400 shadow-lg"
              />
              <button
                onClick={handleDetection}
                disabled={loading}
                className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-lg font-semibold disabled:opacity-60 transition duration-300"
              >
                {loading ? "Scanning..." : "Detect Objects"}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 bg-red-700 bg-opacity-40 text-red-300 px-5 py-3 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          {noObjectsMessage && (
            <div className="mt-6 bg-cyan-900 text-cyan-200 px-5 py-3 rounded-lg text-center font-medium">
              {noObjectsMessage}
            </div>
          )}

          {detectionResults && detectionResults.length > 0 && (
            <div className="mt-8">
              <h3 className="text-cyan-300 mb-4 font-semibold text-xl text-center">
                Detected Objects:
              </h3>
              <div className="bg-[#262B33] p-6 rounded-lg border border-[#30363D] max-h-60 overflow-y-auto shadow-inner">
                {detectionResults.map((result, index) => (
                  <p
                    key={index}
                    className="text-cyan-200 mb-2 text-lg border-b border-cyan-700 last:border-b-0 pb-1"
                  >
                    <span className="font-semibold">{result.class}</span>:{" "}
                    {Math.round(result.confidence * 100)}% confidence
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {snackbarOpen && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-cyan-800 text-white px-8 py-3 rounded-full shadow-lg font-medium select-none">
            {snackbarMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
