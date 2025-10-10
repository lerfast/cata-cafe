// src/components/WelcomeScreenKenBurns.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import backgroundImage from '../assets/background.png';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Variantes de animación
const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: 'easeOut' } },
});
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// Bean decorativo (SVG)
const CoffeeBean = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
    <path d="M45.6 10.7C39.7 4.8 30.4 4.8 24.5 10.7c-5.9 5.9-5.9 15.2 0 21.1 5.9 5.9 15.2 5.9 21.1 0 5.9-5.9 5.9-15.2 0-21.1zM21.7 32.8c-3.9-7.3-3-16.6 3.2-22.8 6.2-6.2 15.6-7 22.8-3.2-2.1 1.1-4.6 2.8-7.2 5.4-7.2 7.2-11.8 15.7-18.8 20.6z" />
  </svg>
);

const WelcomeScreenKenBurns = ({ onProceed }) => {
  const prefersReducedMotion = useReducedMotion();
  const [language, setLanguage] = useState('es');
  const [visitCount, setVisitCount] = useState(0);
  const hasIncremented = useRef(false);

  // contador local (opcional)
  useEffect(() => {
    if (!hasIncremented.current) {
      const visits = localStorage.getItem('visitCount');
      const newCount = visits ? parseInt(visits, 10) + 1 : 1;
      setVisitCount(newCount);
      localStorage.setItem('visitCount', String(newCount));
      hasIncremented.current = true;
    }
  }, []);

  const toggleLanguage = () => setLanguage((l) => (l === 'es' ? 'en' : 'es'));

  const texts = {
    es: {
      welcome: '¡Bienvenido a Cata Café!',
      subtext:
        'Donde cada taza de café cuenta una historia. Relájate, disfruta y descubre nuestras especialidades preparadas con pasión.',
      button: 'Ver el Menú',
      address: 'Nos encontramos en la Calle 12 # 5-45, Neiva, Huila, Colombia.',
      followUs: 'Síguenos:',
      whatsapp: 'Para pedidos',
      lang: 'English',
    },
    en: {
      welcome: 'Welcome to Cata Café!',
      subtext:
        'Where every cup of coffee tells a story. Relax, enjoy, and discover our specialties crafted with passion.',
      button: 'View the Menu',
      address: 'We are located at Calle 12 # 5-45, Neiva, Huila, Colombia.',
      followUs: 'Follow us:',
      whatsapp: 'For orders',
      lang: 'Español',
    },
  };

  // Parallax 3D con el mouse (sutil y elegante)
  const cardRef = useRef(null);
  const tiltX = useMotionValue(0); // rotateX
  const tiltY = useMotionValue(0); // rotateY
  const handleMouseMove = (e) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * 2 - 1;  // -1 .. 1
    const py = (e.clientY - rect.top)  / rect.height * 2 - 1; // -1 .. 1
    tiltY.set(px * 8);
    tiltX.set(-py * 8);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Vapor de café (burbujas sutiles)
  const Steam = () => {
    const bubbles = Array.from({ length: 6 });
    return (
      <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 h-16 w-24 overflow-visible">
        {bubbles.map((_, i) => {
          const delay = i * 0.9;
          const left = 10 + (i % 3) * 20; // posiciones horizontales
          const size = 10 + (i % 4) * 4;
          return (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-white/40 blur-[2px]"
              style={{ left, width: size, height: size }}
              initial={{ y: 0, opacity: 0, scale: 0.8 }}
              animate={prefersReducedMotion ? {} : { y: -64, opacity: [0, 0.8, 0], scale: [0.8, 1.25, 1.35] }}
              transition={{ duration: 3.8, delay, repeat: Infinity, ease: 'easeOut' }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Fondo con efecto Ken Burns */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={false}
        animate={
          prefersReducedMotion
            ? {}
            : { scale: [1, 1.06, 1], x: [0, -10, 0], y: [0, -10, 0] }
        }
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Overlays para legibilidad + textura */}
      <div className="absolute inset-0 bg-black/55" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-70
                [background:radial-gradient(60%_40%_at_12%_10%,rgba(250,204,21,0.16),transparent),
                            radial-gradient(45%_55%_at_85%_15%,rgba(99,102,241,0.14),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-10
        [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.6)_1px,transparent_0)]
        [background-size:14px_14px]"
      />

      {/* Beans flotando */}
      <motion.div
        className="absolute left-6 top-16 text-amber-400/70"
        initial={{ y: 0, rotate: -10 }}
        animate={prefersReducedMotion ? {} : { y: [-8, 8, -8], rotate: [-10, -2, -10] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <CoffeeBean className="h-8 w-8" />
      </motion.div>
      <motion.div
        className="absolute right-10 top-24 text-amber-300/60"
        initial={{ y: 0, rotate: 8 }}
        animate={prefersReducedMotion ? {} : { y: [10, -10, 10], rotate: [8, 0, 8] }}
        transition={{ duration: 9, repeat: Infinity }}
      >
        <CoffeeBean className="h-6 w-6" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-14 text-amber-200/60"
        initial={{ y: 0, rotate: 0 }}
        animate={prefersReducedMotion ? {} : { y: [-6, 6, -6], rotate: [0, 6, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        <CoffeeBean className="h-7 w-7" />
      </motion.div>

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

        {/* Tarjeta principal con tilt/parallax */}
        <motion.div
          ref={cardRef}
          className="relative w-full max-w-3xl rounded-3xl bg-white/10 px-6 py-8 md:px-10 md:py-10 backdrop-blur-lg shadow-2xl ring-1 ring-white/10 will-change-transform"
          variants={fadeIn(0.1)}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{
            transformPerspective: 900,
            rotateX: tiltX,
            rotateY: tiltY,
          }}
        >
          {/* Vapor */}
          {!prefersReducedMotion && <Steam />}

          {/* Logo — sin deformarlo */}
          <motion.img
            src={logo}
            alt="Cata Café Logo"
            className="mx-auto mb-6 max-w-[260px] w-auto h-auto rounded-2xl bg-white/10 p-3 shadow-xl ring-1 ring-white/10"
            variants={fadeIn(0.15)}
          />

          {/* Título gradient */}
          <motion.h1
            className="mx-auto max-w-2xl bg-gradient-to-r from-amber-300 via-white to-amber-200 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
            variants={fadeIn(0.2)}
          >
            {texts[language].welcome}
          </motion.h1>

          {/* Subtexto */}
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-base text-white/90 md:text-lg"
            variants={fadeIn(0.3)}
          >
            {texts[language].subtext}
          </motion.p>

          {/* CTAs */}
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
  className="mt-6 rounded-xl bg-black/35 px-4 py-2.5 text-sm md:text-base lg:text-lg font-medium backdrop-blur ring-1 ring-white/10"
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

        {/* Contador de visitas (discreto) */}
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

export default WelcomeScreenKenBurns;
