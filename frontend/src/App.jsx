import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import CodingStats from './components/CodingStats';
import Achievements from './components/Achievements';
import { fetchPortfolioData } from './services/api';

function App() {
  const [data, setData] = useState({
    stats: [],
    experiences: [],
    projects: [],
    skills: [],
    education: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const portfolioData = await fetchPortfolioData();
        setData(portfolioData);
      } catch (error) {
        console.error("Failed to load portfolio data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: 'white' }}>Loading Portfolio...</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      <nav style={{ 
        position: 'fixed', top: 0, width: '100%', 
        padding: '1rem 1.5rem', background: 'rgba(10, 10, 15, 0.8)', 
        backdropFilter: 'blur(10px)', zIndex: 100, borderBottom: '1px solid var(--glass-border)' 
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            KR.
            <img src="https://cdn3.emoji.gg/emojis/21225-gojo-wave.png" width="32" height="32" alt="logo-gif" />
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#coding-stats" className="nav-link">Profiles</a>
            <a href="#achievements" className="nav-link">Achievements</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      <Hero />
      <CodingStats />
      <Achievements />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
      <Education data={data.education} />
      <Contact />
      
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>© {new Date().getFullYear()} Krishank Raghuvanshi. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
