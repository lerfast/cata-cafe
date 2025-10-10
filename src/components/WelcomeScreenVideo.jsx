// src/components/WelcomeScreenVideo.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import videoMP4 from '../assets/';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: 'easeOut' } },
});
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const WelcomeScreenVideo = ({ onProceed }) => {
  const prefersReducedMotion = useReducedMotion();
  const [language, setLanguage] = useState('es');
  const [visitCount, setVisitCount] = useState(0);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!hasIncremented.current) {
      const visits = localStorage.getItem('visitCount');
      const newCount = visits ? parseInt(visits, 10) + 1 : 1;
      setVisitCount(newCount);
      localStorage.setItem('visitCount', String(newCount));
      hasIncremented.current = true;
    }
  }, []);

  const texts = {
    es: {
      welcome: '¡Bienvenido a Cata Café!',
      subtext:
        'Cada taza cuenta una historia. Descubre nuestras especialidades preparadas con pasión.',
      button: 'Ver el Menú',
      address: 'Calle 12 # 5-45, Neiva, Huila, Colombia.',
      followUs: 'Síguenos:',
      whatsapp: 'Para pedidos',
      lang: 'English',
    },
    en: {
      welcome: 'Welcome to Cata Café!',
      subtext:
        'Every cup tells a story. Discover our specialties crafted with passion.',
      button: 'View the Menu',
      address: 'Calle 12 # 5-45, Neiva, Huila, Colombia.',
      followUs: 'Follow us:',
      whatsapp: 'For orders',
      lang: 'Español',
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Video background */}
      {!prefersReducedMotion && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoMP4}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Grain sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10
        [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)]
        [background-size:14px_14px]"
      />

      {/* Contenido */}
      <motion.div
        className="relative container-page flex min-h-screen flex-col items-center justify-center text-white text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Botón idioma */}
        <motion.button
          className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={() => setLanguage((l) => (l === 'es' ? 'en' : 'es'))}
          variants={fadeIn(0.05)}
          whileTap={{ scale: 0.95 }}
        >
          {language === 'es' ? 'English' : 'Español'}
        </motion.button>

        {/* Card */}
        <motion.div
          className="w-full max-w-3xl rounded-3xl bg-white/10 px-6 py-8 md:px-10 md:py-10 backdrop-blur-xl shadow-2xl ring-1 ring-white/10"
          variants={fadeIn(0.1)}
        >
          <motion.img
            src={logo}
            alt="Cata Café Logo"
            className="mx-auto mb-6 max-w-[260px] w-auto h-auto rounded-2xl bg-white/10 p-3 shadow-xl ring-1 ring-white/10"
            variants={fadeIn(0.15)}
          />
          <motion.h1
            className="mx-auto max-w-2xl bg-gradient-to-r from-amber-300 via-white to-amber-200 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
            variants={fadeIn(0.2)}
          >
            {texts[language].welcome}
          </motion.h1>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg"
            variants={fadeIn(0.3)}
          >
            {texts[language].subtext}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            variants={fadeIn(0.35)}
          >
            <motion.button
              onClick={onProceed}
              className="inline-flex items-center justify-center rounded-full
                         bg-gradient-to-r from-amber-300 to-amber-400
                         px-6 py-3 font-semibold text-black shadow-lg
                         hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-300/60
                         active:scale-[0.98] transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {texts[language].button}
            </motion.button>

            <a
              href="https://wa.me/573228721278"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-3 text-sm font-semibold text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <FontAwesomeIcon className="text-white" icon={faWhatsapp} />
              {texts[language].whatsapp}
            </a>
          </motion.div>
        </motion.div>

        {/* Dirección */}
        <motion.p
          className="mt-6 rounded-lg bg-black/30 px-3 py-2 text-xs md:text-sm backdrop-blur ring-1 ring-white/10"
          variants={fadeIn(0.45)}
        >
          {texts[language].address}
        </motion.p>

        {/* Redes */}
        <motion.div className="mt-6" variants={fadeIn(0.5)}>
          <div className="mb-2 text-sm text-white/85">{texts[language].followUs}</div>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61559948560646"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              aria-label="Facebook"
            >
              <FontAwesomeIcon className="text-[#1877f2] text-xl" icon={faFacebook} />
            </a>
            <a
              href="https://www.instagram.com/catacafeneiva/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
              aria-label="Instagram"
            >
              <FontAwesomeIcon className="text-[#e4405f] text-xl" icon={faInstagram} />
            </a>
          </div>
        </motion.div>

        {/* Contador de visitas */}
        <div className="pointer-events-none fixed bottom-2 right-2 opacity-80 hover:opacity-100 transition">
          <a
            href="https://www.hitwebcounter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-block"
            aria-label="Visit counter"
            title={`Visitas locales: ${visitCount}`}
          >
            <img
              src="https://hitwebcounter.com/counter/counter.php?page=17014532&style=0038&nbdigits=9&type=page&initCount=0"
              alt="Visit counter For Websites"
              border="0"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreenVideo;
