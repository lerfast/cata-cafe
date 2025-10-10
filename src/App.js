import React, { useState } from 'react';
import WelcomeScreenKenBurns from './components/WelcomeScreenKenBurns'; // <- O WelcomeScreenVideo
import Menu from './components/Menu';

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      {!showMenu ? (
        <WelcomeScreenKenBurns onProceed={() => setShowMenu(true)} />
        // <WelcomeScreenVideo onProceed={() => setShowMenu(true)} />
      ) : (
        <Menu />
      )}
    </>
  );
};

export default App;
