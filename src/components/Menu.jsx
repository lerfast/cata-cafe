import React from 'react';
import './Menu.css'; // Importamos el archivo CSS
import MenuSection from './MenuSection';
import logoImage from '../assets/logo.png'; // Importamos la imagen del logo

// Datos del menú
const menuData = [
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
  ];

  const Menu = () => {
    return (
      <div className="menu-container">
        {/* Header fijo con el logo y el título */}
        <div className="menu-header-container">
          <img src={logoImage} alt="Cata Café Logo" className="logo" />
          <h1 className="menu-header">Menú</h1>
        </div>
  
        {/* Renderización de cada sección del menú */}
        {menuData.map((section, index) => (
          <MenuSection key={index} title={section.section} items={section.items} />
        ))}
      </div>
    );
  };
  
  export default Menu;
