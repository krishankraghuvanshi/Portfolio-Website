import React from 'react';
import { motion } from 'framer-motion';

const Education = ({ data }) => {
  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title">Education</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {data.map((edu, index) => (
            <motion.div 
              key={index}
              className="glass-panel"
              style={{ marginBottom: '2rem', textAlign: 'center' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{edu.degree}</h3>
              <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1rem' }}>
                {edu.institution}
              </h4>
              <span style={{ color: 'var(--text-secondary)' }}>{edu.year}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
