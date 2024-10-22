import React, { useState, useEffect, useRef } from 'react';  // Importamos useRef
import { motion } from 'framer-motion';
import './WelcomeScreen.css';
import backgroundImage from '../assets/background.png';  // Importamos la imagen de fondo
import logo from '../assets/logo.png';  // Importamos correctamente el logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Para íconos
import { faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';  // Íconos de redes sociales

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
    transition: { type: 'spring', stiffness: 50, duration: 1, delay: 1.2 },  // Logo aparece después del fondo
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: 1.4 },  // Aparece después del logo
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 1.8 },  // Botón aparece al final
  },
};

// Nuevas variantes para los elementos del footer
const footerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 2.4,  // Aumentamos el delay para que aparezca al final
    },
  },
};

const WelcomeScreen = ({ onProceed }) => {
  const [language, setLanguage] = useState('es');  // Estado para manejar el idioma
  const [visitCount, setVisitCount] = useState(0);  // Estado para el contador de visitas
  const hasIncremented = useRef(false);  // Usamos useRef para evitar incrementos múltiples

  useEffect(() => {
    if (!hasIncremented.current) {  // Verificamos si ya hemos incrementado
      const incrementVisitCount = () => {
        const visits = localStorage.getItem('visitCount');
        if (visits) {
          const newVisitCount = parseInt(visits) + 1;
          setVisitCount(newVisitCount);
          localStorage.setItem('visitCount', newVisitCount);
        } else {
          setVisitCount(1);
          localStorage.setItem('visitCount', 1);
        }
      };

      incrementVisitCount();
      hasIncremented.current = true;  // Marcamos que ya hemos incrementado
    }
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Función para alternar el idioma
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  // Textos en ambos idiomas
  const texts = {
    es: {
      welcome: '¡Bienvenido a Cata Café!',
      subtext: 'Donde cada taza de café cuenta una historia. Relájate, disfruta y descubre nuestras especialidades preparadas con pasión.',
      button: 'Ver el Menú',
      address: 'Nos encontramos en la Calle 12 # 5-45, Neiva, Huila, Colombia.',
      followUs: 'Síguenos en:',
      whatsapp: 'Para pedidos',
    },
    en: {
      welcome: 'Welcome to Cata Café!',
      subtext: 'Where every cup of coffee tells a story. Relax, enjoy, and discover our specialties crafted with passion.',
      button: 'View the Menu',
      address: 'We are located at Calle 12 # 5-45, Neiva, Huila, Colombia.',
      followUs: 'Follow us on:',
      whatsapp: 'For orders',
    },
  };

  return (
    <motion.div
      className="welcome-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}  // Imagen de fondo
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Botón para cambiar de idioma, en la esquina superior izquierda */}
      <motion.button
        className="welcome-language-button"  // Nueva clase CSS para el botón de idioma
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleLanguage}  // Cambiamos el idioma al hacer clic
      >
        {language === 'es' ? 'English' : 'Español'}
      </motion.button>

      {/* Logo de Cata Café con la clase "welcome-logo" */}
      <motion.img 
        src={logo}  // Usamos la variable importada "logo" para que Webpack maneje la ruta correctamente
        alt="Cata Café Logo" 
        className="welcome-logo"  // Usamos la nueva clase aquí
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
        className="welcome-menu-button"  // Nueva clase CSS para el botón de ver menú
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onProceed}
      >
        {texts[language].button}
      </motion.button>

      {/* Footer con la información de contacto y redes sociales */}
      <motion.footer 
        className="welcome-footer"
        initial="hidden"
        animate="visible"
        variants={footerItemVariants} // Animación para el footer
      >
        <motion.p 
          className="address-text"
          variants={footerItemVariants}  // Animación para la dirección
        >
          {texts[language].address}
        </motion.p>

        <motion.a
          href="https://wa.me/573228721278"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
          variants={footerItemVariants}  // Animación para el botón de WhatsApp
        >
          <FontAwesomeIcon icon={faWhatsapp} /> {texts[language].whatsapp}
        </motion.a>

        <motion.p
          variants={footerItemVariants}  // Animación para el texto de redes sociales
        >
          {texts[language].followUs}
        </motion.p>

        <motion.div 
          className="social-icons"
          variants={footerItemVariants}  // Animación para los iconos sociales
        >
          <a
            href="https://www.facebook.com/profile.php?id=61559948560646"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.instagram.com/catacafeneiva/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </motion.div>
      </motion.footer>

      {/* Contador de visitas */}
      <div className="visit-counter">
        {`Visitas: ${visitCount}`}  {/* Mostramos el número de visitas */}
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;
