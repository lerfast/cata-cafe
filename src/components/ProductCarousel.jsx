// src/components/ProductCarousel.js
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ProductCarousel.css';

// Importa las imágenes de los productos de Cata Café (debes agregar las imágenes faltantes en la carpeta)
import capuchinoTradicional from '../assets/capuchino_tradicional.jpg';
import capuchinoSaborizado from '../assets/capuchino_saborizado.jpg';
import capuchinoAlmendras from '../assets/capuchino_almendras.jpg';
import capuchinoVienes from '../assets/capuchino_vienes.jpg';
import cafeLatte from '../assets/cafe_latte.jpg';
import espresso from '../assets/espresso.jpg';
import americano from '../assets/americano.jpg';
import carajillo from '../assets/carajillo.jpg';
import mocaccino from '../assets/mocaccino.jpg';
import chaiLatte from '../assets/chai_latte.jpg';
import chocolate from '../assets/chocolate.jpg';
import aromaticaFrutas from '../assets/aromatica_frutas.jpg';
import cocaCola from '../assets/coca_cola.jpg';
import ginger from '../assets/ginger.jpg';
import aguaSinGas from '../assets/agua_sin_gas.jpg';
import aguaConGas from '../assets/agua_con_gas.jpg';
import sodaSaborizada from '../assets/soda_saborizada.jpg';
import cerveza from '../assets/cerveza.jpg';
import palitosQueso from '../assets/palitos_queso.jpg';
import hojaldrePollo from '../assets/hojaldre_pollo.jpg';
import pandeyuca from '../assets/pandeyuca.jpg';
import moka from '../assets/moka.jpg';
import granizadoCafe from '../assets/granizado_cafe.jpg';
import cafeFrio from '../assets/cafe_frio.jpg';
import limonadaYerbaBuena from '../assets/limonada_yerbabuena.jpg';
import tortaZanahoria from '../assets/torta_zanahoria.jpg';
import tortaRedVelvet from '../assets/torta_red_velvet.jpg';
import tortaChocolate from '../assets/torta_chocolate.jpg';
import sandwichPollo from '../assets/sandwich_pollo.jpg';
import heladoCopa from '../assets/helado_copa.jpg';

// Datos de productos en ambos idiomas
const productsData = {
  es: [
    { id: 1, name: 'Capuchino Tradicional', price: 6000, image: capuchinoTradicional },
    { id: 2, name: 'Capuchino Saborizado', price: 8000, image: capuchinoSaborizado },
    { id: 3, name: 'Capuchino de Almendras', price: 8000, image: capuchinoAlmendras },
    { id: 4, name: 'Capuchino Vianés', price: 7000, image: capuchinoVienes },
    { id: 5, name: 'Café Latte', price: 7000, image: cafeLatte },
    { id: 6, name: 'Café Expresso', price: 4500, image: espresso },
    { id: 7, name: 'Café Americano', price: 5500, image: americano },
    { id: 8, name: 'Café Carajillo', price: 7000, image: carajillo },
    { id: 9, name: 'Mocaccino', price: 7000, image: mocaccino },
    { id: 10, name: 'Chai Latte', price: 7000, image: chaiLatte },
    { id: 11, name: 'Chocolate', price: 6500, image: chocolate },
    { id: 12, name: 'Aromática de Frutas', price: 6000, image: aromaticaFrutas },
    { id: 15, name: 'Cocacola', price: 4500, image: cocaCola },
    { id: 16, name: 'Ginger', price: 4000, image: ginger },
    { id: 17, name: 'Agua sin Gas', price: 3500, image: aguaSinGas },
    { id: 18, name: 'Agua con Gas', price: 4000, image: aguaConGas },
    { id: 19, name: 'Soda Saborizada', price: 6000, image: sodaSaborizada },
    { id: 20, name: 'Cerveza', price: 8000, image: cerveza },
    { id: 21, name: 'Palitos de Queso', price: 5000, image: palitosQueso },
    { id: 22, name: 'Hojaldre de Pollo', price: 5500, image: hojaldrePollo },
    { id: 23, name: 'Pandeyuca', price: 3200, image: pandeyuca },
    { id: 24, name: 'Moka', price: 12000, image: moka },
    { id: 25, name: 'Granizado de Café', price: 11000, image: granizadoCafe },
    { id: 26, name: 'Capuchino Frío', price: 12000, image: cafeFrio },
    { id: 27, name: 'Limonada de Yerbabuena', price: 8000, image: limonadaYerbaBuena },
    { id: 28, name: 'Torta de Zanahoria', price: 8000, image: tortaZanahoria },
    { id: 29, name: 'Torta Red Velvet', price: 8000, image: tortaRedVelvet },
    { id: 30, name: 'Torta de Chocolate', price: 8000, image: tortaChocolate },
    { id: 31, name: 'Sándwich de Pollo', price: 10000, image: sandwichPollo },
    { id: 32, name: 'Copa de Helado', price: 8000, image: heladoCopa },
  ],
  en: [
    { id: 1, name: 'Traditional Cappuccino', price: 6000, image: capuchinoTradicional },
    { id: 2, name: 'Flavored Cappuccino', price: 8000, image: capuchinoSaborizado },
    { id: 3, name: 'Almond Cappuccino', price: 8000, image: capuchinoAlmendras },
    { id: 4, name: 'Viennese Cappuccino', price: 7000, image: capuchinoVienes },
    { id: 5, name: 'Café Latte', price: 7000, image: cafeLatte },
    { id: 6, name: 'Espresso', price: 4500, image: espresso },
    { id: 7, name: 'American Coffee', price: 5500, image: americano },
    { id: 8, name: 'Carajillo', price: 7000, image: carajillo },
    { id: 9, name: 'Mocaccino', price: 7000, image: mocaccino },
    { id: 10, name: 'Chai Latte', price: 7000, image: chaiLatte },
    { id: 11, name: 'Hot Chocolate', price: 6500, image: chocolate },
    { id: 12, name: 'Fruit Aromatic Tea', price: 6000, image: aromaticaFrutas },
    { id: 15, name: 'Coca-Cola', price: 4500, image: cocaCola },
    { id: 16, name: 'Ginger', price: 4000, image: ginger },
    { id: 17, name: 'Still Water', price: 3500, image: aguaSinGas },
    { id: 18, name: 'Sparkling Water', price: 4000, image: aguaConGas },
    { id: 19, name: 'Flavored Soda', price: 6000, image: sodaSaborizada },
    { id: 20, name: 'Beer', price: 8000, image: cerveza },
    { id: 21, name: 'Cheese Sticks', price: 5000, image: palitosQueso },
    { id: 22, name: 'Chicken Puff', price: 5500, image: hojaldrePollo },
    { id: 23, name: 'Pandeyuca', price: 3200, image: pandeyuca },
    { id: 24, name: 'Moka', price: 12000, image: moka },
    { id: 25, name: 'Coffee Slush', price: 11000, image: granizadoCafe },
    { id: 26, name: 'Cold Cappuccino', price: 12000, image: cafeFrio },
    { id: 27, name: 'Mint Lemonade', price: 8000, image: limonadaYerbaBuena },
    { id: 28, name: 'Carrot Cake Slice', price: 8000, image: tortaZanahoria },
    { id: 29, name: 'Red Velvet Cake Slice', price: 8000, image: tortaRedVelvet },
    { id: 30, name: 'Chocolate Cake Slice', price: 8000, image: tortaChocolate },
    { id: 31, name: 'Chicken Sandwich', price: 10000, image: sandwichPollo },
    { id: 32, name: 'Ice Cream Cup', price: 8000, image: heladoCopa },
  ]
};

const ProductCarousel = ({ language }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  // Seleccionar productos según el idioma
  const products = productsData[language];

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <span className="price">${product.price}</span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
