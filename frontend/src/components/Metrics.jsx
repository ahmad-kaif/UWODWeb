import React from 'react';

const Metrics = () => {
  const benchmarkData = [
    {
      model: 'Our Model(YOLOv8m)',
      mAP: '83.7%',
      precision: '86.9%',
      recall: '82.6%',
      mAPP: '37.19%',
    },
    {
      model: 'Model Present on Internet',
      mAP: '82%',
      precision: '83.2%',
      recall: '79.6%',
      mAPP: '36.2%',
    },
    {
      model: 'Another Model Present on Internet',
      mAP: '80.7%',
      precision: '88.9%',
      recall: '87.6%',
      mAPP: '34.1%',
    },
  ];

  return (
    <div className="bg-[#0D1117] text-white py-12 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">
          Model Performance Benchmarks
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#161B22] rounded-lg shadow-lg">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-6 font-semibold">Model</th>
                <th className="text-left py-3 px-6 font-semibold">mAP@0.5</th>
                <th className="text-left py-3 px-6 font-semibold">Precision</th>
                <th className="text-left py-3 px-6 font-semibold">Recall</th>
                <th className="text-left py-3 px-6 font-semibold">mAP@0.5-0.95</th>
              </tr>
            </thead>

            <tbody>
              {benchmarkData.map(({ model, mAP, precision,recall, mAPP }, idx) => (
                <tr
                  key={model}
                  className={`border-b border-gray-700 ${
                    idx === 0 ? 'bg-cyan-900' : 'hover:bg-[#262B33]'
                  }`}
                >
                  <td className="py-4 px-6 font-semibold">{model}</td>
                  <td className="py-4 px-6">{mAP}</td>
                  <td className="py-4 px-6">{precision}</td>
                  <td className="py-4 px-6">{recall}</td>
                  <td className="py-4 px-6">{mAPP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-gray-400 text-center max-w-xl mx-auto">
          Our Superfast AI Model outperforms existing sonar object detection models by 1% in mean average precision at 0.5% with rapid inference speed and lightweight architecture,
          making it ideal for real-time underwater exploration.
        </p>
      </div>
    </div>
  );
};

export default Metrics;
