import React from 'react';
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
  return (
    <motion.div
      className="welcome-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}  // Imagen de fondo
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo de Cata Café con la nueva clase "welcome-logo" */}
      <motion.img 
        src="/assets/logo.png" 
        alt="Cata Café Logo" 
        className="welcome-logo"  /* Actualizamos la clase aquí */
        variants={logoVariants}
      />
      
      {/* Mensaje de bienvenida */}
      <motion.h1 className="welcome-text" variants={textVariants}>
        ¡Bienvenido a Cata Café!
      </motion.h1>

      {/* Subtexto */}
      <motion.p className="welcome-subtext" variants={textVariants} transition={{ delay: 2 }}>
        Donde cada taza de café cuenta una historia. Relájate, disfruta y descubre nuestras especialidades preparadas con pasión.
      </motion.p>

      {/* Botón para ver el menú */}
      <motion.button
        className="button"
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onProceed}
      >
        Ver el Menú
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;
