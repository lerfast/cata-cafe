// src/components/Menu.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../assets/logo.png';
import backgroundMenu from '../assets/backgroundmenu.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import MenuSection from './MenuSection';
import MenuHero3D from './MenuHero3D';

// --- Datos ---
const menuData = {
  es: [
    { section: 'Bebidas Calientes', items: [
      { name: 'Capuchino Tradicional', price: 6000 },
      { name: 'Capuchino Saborizado', price: 8000 },
      { name: 'Capuchino de Almendras', price: 8000 },
      { name: 'Capuchino Vianés', price: 7000 },
      { name: 'Capuchino Irlandés', price: 7000 },
      { name: 'Café Latte', price: 7000 },
      { name: 'Café Expresso', price: 4500 },
      { name: 'Café Americano', price: 5500 },
      { name: 'Café Carajillo', price: 7000 },
      { name: 'Mocaccino', price: 7000 },
      { name: 'Te Chai Latte', price: 7000 },
      { name: 'Milo Caliente', price: 6500 },
      { name: 'Chocolate', price: 6500 },
      { name: 'Aromática de Frutas', price: 6000 },
      { name: 'Aromática de Yerbabuena', price: 6000 },
    ]},
    { section: 'Métodos de Goteo', items: [
      { name: 'Prensa Francesa', price: 14000 },
      { name: 'Chemex', price: 16000 },
    ]},
    { section: 'Otras Bebidas', items: [
      { name: 'Cocacola', price: 4500 },
      { name: 'Ginger', price: 4000 },
      { name: 'Agua sin Gas', price: 3500 },
      { name: 'Agua con Gas', price: 4000 },
      { name: 'Soda Saborizada', price: 6000 },
      { name: 'Cerveza', price: 8000 },
    ]},
    { section: 'Panadería', items: [
      { name: 'Palitos de Queso', price: 5000 },
      { name: 'Hojaldre de Pollo', price: 5500 },
      { name: 'Pandeyuca', price: 3200 },
      { name: 'Galletas de Avena', price: 4000 },
      { name: 'Empanadas', price: 5000 },
    ]},
    { section: 'Bebidas Frías', items: [
      { name: 'Moka', price: 12000 },
      { name: 'Granizado de Café', price: 11000 },
      { name: 'Capuchino', price: 12000 },
      { name: 'Café Latte', price: 9000 },
      { name: 'Te Chai', price: 10000 },
      { name: 'Nevado de Café', price: 13000 },
      { name: 'Afogato', price: 11000 },
      { name: 'Bebida Guanábana Menta', price: 10000 },
      { name: 'Bebida Fresa Yerbabuena', price: 10000 },
      { name: 'Limonada de Yerbabuena', price: 8000 },
      { name: 'Limonada Sencilla', price: 8000 },
      { name: 'Limonada Cerezada', price: 10000 },
      { name: 'Limonada de Coco', price: 10000 },
      { name: 'Granizado de Fruta', price: 8000 },
      { name: 'Malteadas (Café, Vainilla, Oreo)', price: 13000 },
      { name: 'Soda de Frutos Rojos', price: 13000 },
      { name: 'Soda de Frutos Verdes', price: 13000 },
      { name: 'Soda de Frutos Amarillos', price: 13000 },
      { name: 'Soda de Liche', price: 13000 },
    ]},
    { section: 'Tortas', items: [
      { name: 'Porción Torta de Zanahoria', price: 8000 },
      { name: 'Porción Torta de Red Velvet', price: 8000 },
      { name: 'Porción Torta de Chocolate', price: 8000 },
      { name: 'Porción Torta de Almojábana', price: 7000 },
      { name: 'Porción Torta de Naranja', price: 8000 },
    ]},
    { section: 'Sandwiches', items: [
      { name: 'Sándwich de Pollo', price: 10000 },
      { name: 'Sándwich Ranchero', price: 13000 },
      { name: 'Sándwich Sencillo', price: 7000 },
      { name: 'Sándwich de Jamón y Queso', price: 8000 },
    ]},
    { section: 'Otros', items: [
      { name: 'Copa de Helado', price: 8000 },
      { name: 'Adición de Leche de Almendras', price: 2000 },
      { name: 'Desayuno Omelet', price: 15000 },
    ]},
  ],
  en: [
    { section: 'Hot Drinks', items: [
      { name: 'Traditional Cappuccino', price: 6000 },
      { name: 'Flavored Cappuccino', price: 8000 },
      { name: 'Almond Cappuccino', price: 8000 },
      { name: 'Viennese Cappuccino', price: 7000 },
      { name: 'Irish Cappuccino', price: 7000 },
      { name: 'Café Latte', price: 7000 },
      { name: 'Espresso', price: 4500 },
      { name: 'American', price: 5500 },
      { name: 'Carajillo', price: 7000 },
      { name: 'Mocaccino', price: 7000 },
      { name: 'Chai Latte', price: 7000 },
      { name: 'Hot Milo', price: 6500 },
      { name: 'Chocolate', price: 6500 },
      { name: 'Fruit Aromatic Tea', price: 6000 },
      { name: 'Mint Aromatic Tea', price: 6000 },
    ]},
    { section: 'Drip Methods', items: [
      { name: 'French Press', price: 14000 },
      { name: 'Chemex', price: 16000 },
    ]},
    { section: 'Other Drinks', items: [
      { name: 'Coke', price: 4500 },
      { name: 'Ginger', price: 4000 },
      { name: 'Still Water', price: 3500 },
      { name: 'Sparkling Water', price: 4000 },
      { name: 'Flavored Soda', price: 6000 },
      { name: 'Beer', price: 8000 },
    ]},
    { section: 'Bakery', items: [
      { name: 'Cheese Sticks', price: 5000 },
      { name: 'Chicken Puff', price: 5500 },
      { name: 'Pandeyuca', price: 3200 },
      { name: 'Oatmeal Cookies', price: 4000 },
      { name: 'Empanadas', price: 5000 },
    ]},
    { section: 'Cold Drinks', items: [
      { name: 'Moka', price: 12000 },
      { name: 'Iced Coffee', price: 11000 },
      { name: 'Cappuccino', price: 12000 },
      { name: 'Iced Latte', price: 9000 },
      { name: 'Iced Chai', price: 10000 },
      { name: 'Coffee Frappe', price: 13000 },
      { name: 'Affogato', price: 11000 },
      { name: 'Soursop Mint Drink', price: 10000 },
      { name: 'Strawberry Mint Drink', price: 10000 },
      { name: 'Mint Lemonade', price: 8000 },
      { name: 'Plain Lemonade', price: 8000 },
      { name: 'Cherry Lemonade', price: 10000 },
      { name: 'Coconut Lemonade', price: 10000 },
      { name: 'Fruit Slush', price: 8000 },
      { name: 'Milkshakes (Coffee, Vanilla, Oreo)', price: 13000 },
      { name: 'Red Berry Soda', price: 13000 },
      { name: 'Green Fruit Soda', price: 13000 },
      { name: 'Yellow Fruit Soda', price: 13000 },
      { name: 'Liche Soda', price: 13000 },
    ]},
    { section: 'Cakes', items: [
      { name: 'Carrot Cake Slice', price: 8000 },
      { name: 'Red Velvet Cake Slice', price: 8000 },
      { name: 'Chocolate Cake Slice', price: 8000 },
      { name: 'Corn Cake Slice', price: 7000 },
      { name: 'Orange Cake Slice', price: 8000 },
    ]},
    { section: 'Sandwiches', items: [
      { name: 'Chicken Sandwich', price: 10000 },
      { name: 'Ranch Sandwich', price: 13000 },
      { name: 'Simple Sandwich', price: 7000 },
      { name: 'Ham and Cheese Sandwich', price: 8000 },
    ]},
    { section: 'Others', items: [
      { name: 'Ice Cream Cup', price: 8000 },
      { name: 'Almond Milk Add-on', price: 2000 },
      { name: 'Omelette Breakfast', price: 15000 },
    ]},
  ],
};

const footerTexts = {
  es: { madeBy: 'Desarrollado por Luis Emilio Rojas', contact: '¿Quieres un sitio web como este? ¡Hablemos!' },
  en: { madeBy: 'Developed by Luis Emilio Rojas', contact: "Want a website like this? Let's talk!" },
};

const slugify = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Menu() {
  const [language, setLanguage] = useState('es');
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(null);
  const [showCta, setShowCta] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);

  const toggleLanguage = () => setLanguage((l) => (l === 'es' ? 'en' : 'es'));

  const formatter = useMemo(
    () => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }),
    []
  );

  const filteredSections = useMemo(() => {
    const src = menuData[language];
    if (!query.trim()) return src;
    const q = query.trim().toLowerCase();
    return src
      .map((sec) => ({ ...sec, items: sec.items.filter((it) => it.name.toLowerCase().includes(q)) }))
      .filter((sec) => sec.items.length > 0);
  }, [language, query]);

  const allSections = menuData[language];

  useEffect(() => {
    const ids = allSections.map((s) => slugify(s.section));
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });

    const onScroll = () => setShowCta(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let footerObs;
    if (footerRef.current) {
      footerObs = new IntersectionObserver(
        ([entry]) => setFooterVisible(entry.isIntersecting),
        { root: null, threshold: 0.1 }
      );
      footerObs.observe(footerRef.current);
    }

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
      footerObs?.disconnect();
    };
  }, [language, allSections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${backgroundMenu})` }}
    >
      <div className="pointer-events-none absolute inset-0 bg-white/35 mix-blend-luminosity" />
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm">
        <div className="container-page flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-xl bg-white/60 p-1 shadow">
              <img src={logoImage} alt="Cata Café" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-xl font-semibold text-brand-primary md:text-2xl">Menú</h1>
          </div>
          <button
            className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            onClick={toggleLanguage}
          >
            {language === 'es' ? 'English' : 'Español'}
          </button>
        </div>

        <div className="border-t border-black/5 bg-white/85 backdrop-blur">
          <div className="container-page flex flex-col gap-3 py-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              {allSections.map((sec) => {
                const id = slugify(sec.section);
                const isActive = activeId === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition ring-1
                      ${isActive ? 'bg-amber-100 text-brand-primary ring-amber-300' : 'bg-white text-gray-700 ring-black/10 hover:bg-gray-50'}`}
                    aria-current={isActive ? 'true' : 'false'}
                  >
                    {sec.section}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={language === 'es' ? 'Buscar producto…' : 'Search product…'}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2 outline-none ring-0 focus:border-brand-primary/40 focus:ring-2 focus:ring-brand-primary/30"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm hover:bg-gray-50"
                >
                  {language === 'es' ? 'Limpiar' : 'Clear'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* HERO 3D — ahora recibe el idioma */}
      <section className="container-page pt-4">
        <div className="overflow-hidden rounded-3xl bg-white/40 backdrop-blur ring-1 ring-white/40 shadow-card">
          <MenuHero3D language={language} />
        </div>
      </section>

      <main className="container-page pb-24 pt-6 md:pt-8">
        <AnimatePresence mode="popLayout">
          {filteredSections.length === 0 ? (
            <motion.div
              key="nores"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl bg-white/95 p-6 text-center shadow-card"
            >
              {language === 'es' ? 'No encontramos resultados.' : 'No results found.'}
            </motion.div>
          ) : (
            filteredSections.map((section) => (
              <MenuSection
                key={section.section}
                id={slugify(section.section)}
                title={section.section}
                items={section.items}
                currencyFormatter={formatter}
                query={query}
              />
            ))
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showCta && !footerVisible && (
          <motion.a
            href="https://wa.me/573228721278"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={language === 'es' ? 'Pedir por WhatsApp' : 'Order on WhatsApp'}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className="fixed z-50 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-white shadow-lg hover:shadow-xl
                       right-[calc(1rem+env(safe-area-inset-right,0px))]
                       bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            {language === 'es' ? 'Pedir por WhatsApp' : 'Order on WhatsApp'}
          </motion.a>
        )}
      </AnimatePresence>

      <motion.footer
        ref={footerRef}
        className="container-page mb-8 mt-2 rounded-2xl bg-white/95 p-6 text-center shadow-card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-base text-brand-primary">{footerTexts[language].madeBy}</p>
        <p className="mt-1 text-lg font-semibold">{footerTexts[language].contact}</p>

        <div className="mt-3 flex items-center justify-center gap-5 text-2xl">
          <a href="https://wa.me/573187757620" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:opacity-80" aria-label="WhatsApp">
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a href="https://www.linkedin.com/in/luisemiliorojas/" target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:opacity-80" aria-label="LinkedIn">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/lerfast" target="_blank" rel="noopener noreferrer" className="text-[#333] hover:opacity-80" aria-label="GitHub">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </div>
      </motion.footer>
    </div>
  );
}
