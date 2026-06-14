import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await submitContact(formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Failed to send message. Try again later.');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="https://github.com/krishankraghuvanshi" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem', textDecoration: 'underline', textDecorationColor: 'white', textUnderlineOffset: '4px' }}>GitHub</a>
          <a href="https://www.linkedin.com/in/krishankraghuvanshi/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem', textDecoration: 'underline', textDecorationColor: 'white', textUnderlineOffset: '4px' }}>LinkedIn</a>
          <a href="https://leetcode.com/u/kri5H4nkr49Hu1c/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem', textDecoration: 'underline', textDecorationColor: 'white', textUnderlineOffset: '4px' }}>LeetCode</a>
          <a href="https://codeforces.com/profile/Krishank" target="_blank" rel="noopener noreferrer" style={{ color: 'white', fontSize: '1.2rem', textDecoration: 'underline', textDecorationColor: 'white', textUnderlineOffset: '4px' }}>CodeForces</a>
        </div>
        <motion.div 
          className="glass-panel"
          style={{ maxWidth: '600px', margin: '0 auto' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <a href="https://emoji.gg/emoji/69764-pickingpetals" target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
                  <img src="https://cdn3.emoji.gg/emojis/69764-pickingpetals.gif" width="48" height="48" alt="PickingPetals" />
                </a>
                <textarea 
                  name="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  style={{ width: '100%' }}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }}>
              Send Message
            </button>
            {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: status.includes('success') ? '#4ade80' : '#f87171' }}>{status}</p>}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
