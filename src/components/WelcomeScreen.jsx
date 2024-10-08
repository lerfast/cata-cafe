import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './WelcomeScreen.css';
import backgroundImage from '../assets/background.png';  // Importamos la imagen

// Variantes para las animaciones
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,  // La imagen de fondo hace un fade-in en 1.5 segundos
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, duration: 1, delay: 1.6 },  // Logo aparece después del fondo
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: 1.8 },  // Aparece después del logo
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 2.2 },  // Botón aparece al final
  },
};

const WelcomeScreen = ({ onProceed }) => {
  const [language, setLanguage] = useState('es');  // Estado para manejar el idioma

  // Textos en ambos idiomas
  const texts = {
    es: {
      welcome: '¡Bienvenido a Cata Café!',
      subtext: 'Donde cada taza de café cuenta una historia. Relájate, disfruta y descubre nuestras especialidades preparadas con pasión.',
      button: 'Ver el Menú',
    },
    en: {
      welcome: 'Welcome to Cata Café!',
      subtext: 'Where every cup of coffee tells a story. Relax, enjoy, and discover our specialties crafted with passion.',
      button: 'View the Menu',
    },
  };

  // Función para alternar el idioma
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <motion.div
      className="welcome-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}  // Imagen de fondo
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo de Cata Café con la clase "welcome-logo" */}
      <motion.img 
        src="/assets/logo.png" 
        alt="Cata Café Logo" 
        className="welcome-logo"  /* Usamos la nueva clase aquí */
        variants={logoVariants}
      />
      
      {/* Mensaje de bienvenida */}
      <motion.h1 className="welcome-text" variants={textVariants}>
        {texts[language].welcome}
      </motion.h1>

      {/* Subtexto */}
      <motion.p className="welcome-subtext" variants={textVariants} transition={{ delay: 2 }}>
        {texts[language].subtext}
      </motion.p>

      {/* Botón para ver el menú */}
      <motion.button
        className="button"
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onProceed}
      >
        {texts[language].button}
      </motion.button>

      {/* Botón para cambiar de idioma */}
      <motion.button
        className="button language-button"  /* Añadimos clase extra para este botón */
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleLanguage}  // Cambiamos el idioma al hacer clic
      >
        {language === 'es' ? 'English' : 'Español'}
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;
