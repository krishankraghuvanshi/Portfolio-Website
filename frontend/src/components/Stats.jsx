import React from 'react';
import { motion } from 'framer-motion';

const Stats = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="grid grid-cols-3">
          {data.map((stat, index) => (
            <motion.div 
              key={index}
              className="glass-panel"
              style={{ textAlign: 'center' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ fontSize: '3rem', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                {stat.value}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
