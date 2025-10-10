import React from 'react';
import { motion } from 'framer-motion';
import MenuItem from './MenuItem';

const MenuSection = ({ id, title, items, currencyFormatter, query = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-28 mb-10" aria-labelledby={`${id}-title`}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-5 w-fit rounded-full bg-white/85 px-5 py-2 text-center shadow"
      >
        <h3 id={`${id}-title`} className="text-lg md:text-xl font-extrabold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
          {title}
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item, idx) => (
          <MenuItem
            key={`${id}-${idx}`}
            name={item.name}
            price={item.price}
            currencyFormatter={currencyFormatter}
            query={query}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
