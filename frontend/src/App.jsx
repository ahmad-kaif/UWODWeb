import { useState } from 'react';
import Main from './components/Main';
import LandingPage from './components/LandingPage';

function App() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      {isClicked ? <Main /> : <LandingPage setIsClicked={setIsClicked} />}
    </>
  );
}

export default App;
