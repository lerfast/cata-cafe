import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Resalta coincidencias
function highlight(name, q) {
  if (!q) return name;
  const i = name.toLowerCase().indexOf(q.toLowerCase());
  if (i === -1) return name;
  const before = name.slice(0, i);
  const match  = name.slice(i, i + q.length);
  const after  = name.slice(i + q.length);
  return (
    <>
      {before}
      <mark className="rounded px-1 bg-amber-100 text-black">{match}</mark>
      {after}
    </>
  );
}

export default function MenuItem({ name, price, currencyFormatter, query }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sX = useSpring(x, { stiffness: 160, damping: 14, mass: 0.4 });
  const sY = useSpring(y, { stiffness: 160, damping: 14, mass: 0.4 });

  const rotateX = useTransform(sY, [-0.5, 0.5], [10, -10]); // mueve arriba/abajo
  const rotateY = useTransform(sX, [-0.5, 0.5], [-10, 10]); // mueve izquierda/derecha

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    x.set(px - 0.5);
    y.set(py - 0.5);
    el.style.setProperty('--glx', `${px * 100}%`);
    el.style.setProperty('--gly', `${py * 100}%`);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          transformPerspective: 900,
        }}
        className="rounded-2xl p-[1px] bg-gradient-to-r from-amber-300/70 via-white/40 to-amber-400/70 transition"
      >
        <article
          className="relative rounded-2xl bg-white/95 px-4 py-3 shadow transition
                     hover:shadow-xl will-change-transform"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Glare */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(220px 220px at var(--glx,50%) var(--gly,50%), rgba(255,255,255,0.35), transparent 60%)',
              transform: 'translateZ(60px)',
            }}
          />

          <div className="flex items-baseline gap-3" style={{ transform: 'translateZ(16px)' }}>
            <h4 className="text-[1.05rem] font-medium text-gray-800">
              {highlight(name, query)}
            </h4>
            <span aria-hidden="true" className="flex-1 translate-y-[6px] border-t border-dotted border-gray-300" />
            <motion.span
              className="relative text-[1.05rem] font-semibold text-brand-accent"
              whileHover={{ scale: 1.06 }}
              style={{ transform: 'translateZ(28px)' }}
            >
              {currencyFormatter.format(price)}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-1 -top-1 h-[2px] opacity-0 group-hover:opacity-100 transition
                           bg-gradient-to-r from-transparent via-amber-300 to-transparent"
              />
            </motion.span>
          </div>
        </article>
      </motion.div>
    </motion.div>
  );
}
