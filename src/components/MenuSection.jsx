// src/components/MenuSection.js
import React from 'react';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const SectionTitle = styled.h2`
  margin: 2rem 0 1rem 0;
  font-size: 1.8rem;
  font-weight: bold;
  color: #2a7f62;
  text-align: center;
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
