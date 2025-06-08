
import underwaterImg from '../assets/underwater.jpg'; // Import image properly

const HeroSection = ({ setIsClicked }) => {
  return (
    <div
      className="h-screen relative bg-cover bg-center"
      style={{ backgroundImage: `url(${underwaterImg})` }} // Correct usage
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Let's Detect Underwater Objects
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Using our Superfast AI Model for Sonar Image Analysis
        </p>
        <button
          onClick={() => setIsClicked(true)}
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-md font-semibold"
        >
          Start Detection
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
