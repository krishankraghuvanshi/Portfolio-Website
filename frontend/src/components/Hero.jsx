import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 0.8, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
          style={{ maxWidth: '800px' }}
        >
          <h2 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>
            Hello, I am
          </h2>
          <h1 className="gradient-text" style={{ fontSize: '5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.5rem' }}>
            Krishank Raghuvanshi
          </h1>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '1.5rem', whiteSpace: 'nowrap' }}>
            Competitive Programmer · Full Stack Developer · Problem Solver · Machine Learning
          </h3>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '700px', lineHeight: '1.6' }}>
            Hello! I'm Krishank, a Computer Science & Engineering (B.Tech) student, competitive programmer, and software developer. I thrive on solving complex algorithmic challenges, exploring cutting-edge technologies, and building innovative digital experiences. Let's get in touch and build something different!
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#contact" className="btn">Get In Touch</a>
            <a href="#projects" className="btn" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>View Work</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
