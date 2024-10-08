// src/components/MenuItem.js
import React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MenuItemContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f4f4f4;
  }
`;

const ItemName = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
`;

const ItemPrice = styled.span`
  font-size: 1.2rem;
  color: #ff9f1c;
`;

const MenuItem = ({ name, price }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // La animación se ejecuta solo una vez
    threshold: 0.1,    // Puedes ajustar el umbral según tus necesidades
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <MenuItemContainer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.8 }} // Ajusta la duración según prefieras
    >
      <ItemName>{name}</ItemName>
      <ItemPrice>${price}</ItemPrice>
    </MenuItemContainer>
  );
};

export default MenuItem;
