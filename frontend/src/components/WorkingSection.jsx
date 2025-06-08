import React from 'react';

const WorkingSection = () => {
  return (
    <div className="bg-[#0D1117] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
          How Does It Work?
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Our AI model analyzes sonar images to detect and highlight potential underwater objects.
          It uses deep learning techniques trained on thousands of real-world sonar scans.
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
            <h3 className="text-cyan-300 text-xl font-semibold mb-2">1. Upload</h3>
            <p className="text-gray-400">You upload a sonar image captured from underwater devices.</p>
          </div>
          <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
            <h3 className="text-cyan-300 text-xl font-semibold mb-2">2. Scan</h3>
            <p className="text-gray-400">Our system processes the image with deep neural networks in real-time.</p>
          </div>
          <div className="bg-[#161B22] p-4 rounded-lg border border-[#30363D]">
            <h3 className="text-cyan-300 text-xl font-semibold mb-2">3. Detect</h3>
            <p className="text-gray-400">It highlights and reports objects of interest with high accuracy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingSection;
