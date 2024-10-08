import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Menu from './components/Menu'; // Importamos el nuevo componente Menu

const App = () => {
  const [showMenu, setShowMenu] = useState(false); // Estado para manejar el menú

  return (
    <>
      {!showMenu ? (
        <WelcomeScreen onProceed={() => setShowMenu(true)} />
      ) : (
        <Menu /> 
      )}
    </>
  );
};

export default App;
