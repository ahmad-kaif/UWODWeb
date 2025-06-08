import React from "react";
import mainImg from "../assets/objects.png"; // Replace with your big image
import overlayImg1 from "../assets/result1.png"; // Replace with first overlay
import overlayImg2 from "../assets/result2.png"; // Replace with second overlay

const ModelDisplay = () => {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white px-6 py-12 flex items-center justify-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Big Image */}
        <div className="relative group">
          <img
            src={mainImg}
            alt="Main Sonar"
            className="w-full h-auto rounded-2xl shadow-2xl transform transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 rounded-2xl border-2 border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Right Side - Overlapping Images + Description */}
        <div className="flex flex-col space-y-8">
          {/* Overlapping Images */}
          <div className="relative w-full h-72 perspective-1000">
            <img
              src={overlayImg1}
              alt="Overlay 1"
              className="w-80 h-48 rounded-xl shadow-xl absolute top-0 left-0 z-20 border-2 border-cyan-500/50 transform transition-transform duration-300 hover:-translate-y-1 hover:rotate-1"
            />
            <img
              src={overlayImg2}
              alt="Overlay 2"
              className="w-80 h-48 rounded-xl shadow-xl absolute top-12 left-12 z-10 border-2 border-cyan-500/50 transform transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1"
            />
          </div>

          {/* Text Section */}
          <div className="bg-[#1A202C]/80 p-6 rounded-xl border border-cyan-500/20 shadow-lg">
            <h2 className="text-3xl font-extrabold text-cyan-400 mb-4 tracking-tight">
              How Our Model Works
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed">
              Our AI model leverages cutting-edge sonar image processing to
              detect objects with unparalleled precision. The overlapping images
              illustrate distinct analysis layers, showcasing regions of
              interest, object boundaries, and confidence metrics in a visually
              intuitive manner. Our AI model detects the objects shown in the
              left-hand side images. It is trained on the UATD Dataset using
              multibeam forward sonar images and utilizes the YOLOv8-m superfast
              deep learning model, highlighting its vital role in advancing
              marine and ocean life understanding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDisplay;
