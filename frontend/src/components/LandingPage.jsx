
import HeroSection from './HeroSection';
import Metrics from './Metrics';
import ModelDisplay from './ModelDisplay';
import WorkingSection from './WorkingSection';

const LandingPage = ({ setIsClicked }) => {
  return (
    <div>
      <HeroSection setIsClicked={setIsClicked} />
      <WorkingSection />
      <ModelDisplay/>
      <Metrics/>
    </div>
  );
};

export default LandingPage;
