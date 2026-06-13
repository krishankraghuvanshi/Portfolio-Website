import React from 'react';
import { motion } from 'framer-motion';

const Projects = ({ data }) => {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="grid grid-cols-2">
          {data.map((project, index) => (
            <motion.div 
              key={index}
              className="glass-panel"
              style={{ padding: 0, overflow: 'hidden' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{project.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  {project.description}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} style={{ 
                      padding: '0.4rem 1rem', 
                      background: 'var(--glass-bg)', 
                      border: '1px solid rgba(99, 102, 241, 0.5)',
                      color: 'var(--text-primary)',
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      boxShadow: '0 0 10px rgba(99, 102, 241, 0.15)'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} className="btn" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
