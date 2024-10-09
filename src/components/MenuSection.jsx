// src/components/MenuSection.js
import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const SectionTitle = styled.h2`
  margin: 2rem auto 1rem auto;  /* Auto en los márgenes izquierda y derecha para centrar */
  font-size: 1.8rem;
  font-weight: bold;
  color: #2a7f62;
  text-align: center;
  background: rgba(230, 228, 228, 0.6);
  width: fit-content;  /* Asegura que el contenedor se ajuste al contenido */
  padding: 0.5rem 1rem; /* Añade un padding para un mejor ajuste */
  border-radius: 8px;   /* Bordes redondeados */
`;



const MenuSectionContainer = styled.div`
  margin-bottom: 2rem;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MenuSection = ({ title, items }) => {
  return (
    <MenuSectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <ItemContainer>
        {items.map((item, index) => (
          <MenuItem key={index} name={item.name} price={item.price} />
        ))}
      </ItemContainer>
    </MenuSectionContainer>
  );
};

export default MenuSection;
