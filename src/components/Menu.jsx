import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Importamos motion para las animaciones
import './Menu.css'; // Importamos el archivo CSS
import MenuSection from './MenuSection';
import logoImage from '../assets/logo.png'; // Importamos la imagen del logo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importamos el componente de FontAwesome
import { faWhatsapp, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';



// Datos del menú en ambos idiomas (actualizado con todos los elementos)


// Datos del menú en ambos idiomas
// Datos del menú en ambos idiomas (actualizado con todos los elementos)
const menuData = {
    es: [
      {
        section: 'Bebidas Calientes',
        items: [
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
        ],
      },
      {
        section: 'Métodos de Goteo',
        items: [
          { name: 'Prensa Francesa', price: 14000 },
          { name: 'Chemex', price: 16000 },
        ],
      },
      {
        section: 'Otras Bebidas',
        items: [
          { name: 'Cocacola', price: 4500 },
          { name: 'Ginger', price: 4000 },
          { name: 'Agua sin Gas', price: 3500 },
          { name: 'Agua con Gas', price: 4000 },
          { name: 'Soda Saborizada', price: 6000 },
          { name: 'Cerveza', price: 8000 },
        ],
      },
      {
        section: 'Panadería',
        items: [
          { name: 'Palitos de Queso', price: 5000 },
          { name: 'Hojaldre de Pollo', price: 5500 },
          { name: 'Pandeyuca', price: 3200 },
          { name: 'Galletas de Avena', price: 4000 },
          { name: 'Empanadas', price: 5000 },
        ],
      },
      {
        section: 'Bebidas Frías',
        items: [
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
        ],
      },
      {
        section: 'Tortas',
        items: [
          { name: 'Porción Torta de Zanahoria', price: 8000 },
          { name: 'Porción Torta de Red Velvet', price: 8000 },
          { name: 'Porción Torta de Chocolate', price: 8000 },
          { name: 'Porción Torta de Almojábana', price: 7000 },
        ],
      },
      {
        section: 'Sandwiches',
        items: [
          { name: 'Sándwich de Pollo', price: 10000 },
          { name: 'Sándwich Ranchero', price: 13000 },
          { name: 'Sándwich Sencillo', price: 7000 },
          { name: 'Sándwich de Jamón y Queso', price: 8000 },
        ],
      },
      {
        section: 'Otros',
        items: [
          { name: 'Copa de Helado', price: 8000 },
          { name: 'Adición de Leche de Almendras', price: 2000 },
          { name: 'Desayuno Omelet', price: 13000 },
        ],
      },
    ],
    en: [
      {
        section: 'Hot Drinks',
        items: [
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
        ],
      },
      {
        section: 'Drip Methods',
        items: [
          { name: 'French Press', price: 14000 },
          { name: 'Chemex', price: 16000 },
        ],
      },
      {
        section: 'Other Drinks',
        items: [
          { name: 'Coke', price: 4500 },
          { name: 'Ginger', price: 4000 },
          { name: 'Still Water', price: 3500 },
          { name: 'Sparkling Water', price: 4000 },
          { name: 'Flavored Soda', price: 6000 },
          { name: 'Beer', price: 8000 },
        ],
      },
      {
        section: 'Bakery',
        items: [
          { name: 'Cheese Sticks', price: 5000 },
          { name: 'Chicken Puff', price: 5500 },
          { name: 'Pandeyuca', price: 3200 },
          { name: 'Oatmeal Cookies', price: 4000 },
          { name: 'Empanadas', price: 5000 },
        ],
      },
      {
        section: 'Cold Drinks',
        items: [
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
        ],
      },
      {
        section: 'Cakes',
        items: [
          { name: 'Carrot Cake Slice', price: 8000 },
          { name: 'Red Velvet Cake Slice', price: 8000 },
          { name: 'Chocolate Cake Slice', price: 8000 },
          { name: 'Corn Cake Slice', price: 7000 },
        ],
      },
      {
        section: 'Sandwiches',
        items: [
          { name: 'Chicken Sandwich', price: 10000 },
          { name: 'Ranch Sandwich', price: 13000 },
          { name: 'Simple Sandwich', price: 7000 },
          { name: 'Ham and Cheese Sandwich', price: 8000 },
        ],
      },
      {
        section: 'Others',
        items: [
          { name: 'Ice Cream Cup', price: 8000 },
          { name: 'Almond Milk Add-on', price: 2000 },
          { name: 'Omelette Breakfast', price: 13000 },
        ],
      },
    ],
  };
  

  const footerTexts = {
    es: {
      madeBy: 'Desarrollado por Luis Emilio Rojas',
      contact: '¿Quieres un sitio web como este? ¡Hablemos!',
    },
    en: {
      madeBy: 'Developed by Luis Emilio Rojas',
      contact: "Want a website like this? Let's talk!",
    },
  };
  
  // Variantes para la animación del footer
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5,
      },
    },
  };
  
  const Menu = () => {
    const [language, setLanguage] = useState('es'); // Estado para el idioma (español por defecto)
  
    // Función para alternar el idioma
    const toggleLanguage = () => {
      setLanguage(language === 'es' ? 'en' : 'es');
    };
  
    return (
      <div className="menu-container">
        {/* Header fijo con el logo, título y botón de idioma */}
        <div className="menu-header-container">
          <img src={logoImage} alt="Cata Café Logo" className="logo" />
          <h1 className="menu-header">{language === 'es' ? 'Menú' : 'Menu'}</h1>
  
          {/* Botón para alternar el idioma */}
          <button className="language-button" onClick={toggleLanguage}>
            {language === 'es' ? 'English' : 'Español'}
          </button>
        </div>
  
        {/* Renderización de cada sección del menú */}
        {menuData[language].map((section, index) => (
          <MenuSection key={index} title={section.section} items={section.items} />
        ))}
  
        {/* Footer mejorado con animaciones */}
        <motion.footer
          className="footer-container"
          initial="hidden"
          animate="visible"
          variants={footerVariants}
        >
          <p className="footer-madeby">{footerTexts[language].madeBy}</p>
          <p className="footer-contact">{footerTexts[language].contact}</p>
          <motion.div
            className="footer-icons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <a href="https://wa.me/573187757620" className="whatsapp" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
            <a href="https://www.linkedin.com/in/luisemiliorojas/" className="linkedin" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com/lerfast" className="github" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </motion.div>
        </motion.footer>
      </div>
    );
  };
  
  export default Menu;
