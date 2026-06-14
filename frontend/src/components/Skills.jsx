import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ data }) => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Technical Skills</h2>
          <a href="https://emoji.gg/emoji/9843-renpylogo" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
            <img src="https://cdn3.emoji.gg/emojis/9843-renpylogo.png" width="64" height="64" alt="RenPyLogo" />
          </a>
        </div>
        
        <h3 className="gradient-text" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>Languages</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '900px', margin: '0 auto', marginBottom: '4rem' }}>
          {data.filter(skill => skill.category === 'Languages').map((skill, index) => (
            <motion.div 
              key={index}
              className="glass-panel"
              style={{ padding: '1rem 2rem', textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{skill.name}</span>
            </motion.div>
          ))}
        </div>

        <h3 className="gradient-text" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>Frameworks and Libraries</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '900px', margin: '0 auto', marginBottom: '4rem' }}>
          {data.filter(skill => skill.category === 'Frameworks and Libraries').map((skill, index) => (
            <motion.div 
              key={index}
              className="glass-panel"
              style={{ padding: '1rem 2rem', textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{skill.name}</span>
            </motion.div>
          ))}
        </div>

        <h3 className="gradient-text" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>Tools & Infrastructure</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '900px', margin: '0 auto', marginBottom: '4rem' }}>
          {data.filter(skill => skill.category === 'Tools & Infrastructure').map((skill, index) => (
            <motion.div 
              key={index}
              className="glass-panel"
              style={{ padding: '1rem 2rem', textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{skill.name}</span>
            </motion.div>
          ))}
        </div>

        <h3 className="gradient-text" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem' }}>Concepts</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
          {data.filter(skill => skill.category === 'Concepts').map((skill, index) => (
            <motion.div 
              key={index}
              className="glass-panel"
              style={{ padding: '1rem 2rem', textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <span style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
