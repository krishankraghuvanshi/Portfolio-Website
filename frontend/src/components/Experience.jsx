import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ data }) => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {data.map((exp, index) => (
            <motion.div 
              key={index}
              className="glass-panel"
              style={{ marginBottom: '2rem', borderLeft: '4px solid var(--accent-primary)' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{exp.role}</h3>
                  <h4 style={{ color: 'var(--accent-secondary)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                    {exp.company}
                  </h4>
                </div>
                <span style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  padding: '0.5rem 1rem', 
                  borderRadius: '20px',
                  fontSize: '0.9rem'
                }}>
                  {exp.period}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
