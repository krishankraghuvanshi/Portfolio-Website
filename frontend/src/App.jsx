import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import LeetCodeStats from './components/LeetCodeStats';
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
        padding: '1.5rem', background: 'rgba(10, 10, 15, 0.8)', 
        backdropFilter: 'blur(10px)', zIndex: 100, borderBottom: '1px solid var(--glass-border)' 
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>KR.</h1>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#projects" style={{ color: 'white' }}>Projects</a>
            <a href="#skills" style={{ color: 'white' }}>Skills</a>
            <a href="#leetcode" style={{ color: 'white' }}>LeetCode</a>
            <a href="#achievements" style={{ color: 'white' }}>Achievements</a>
            <a href="#contact" style={{ color: 'white' }}>Contact</a>
          </div>
        </div>
      </nav>

      <Hero />
      <LeetCodeStats />
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
