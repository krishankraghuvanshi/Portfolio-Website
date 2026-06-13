import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Achievements = () => {
  const [profile, setProfile] = useState(null);
  const [contestStats, setContestStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [profileRes, contestRes] = await Promise.all([
          fetch('https://alfa-leetcode-api.onrender.com/kri5H4nkr49Hu1c'),
          fetch('https://alfa-leetcode-api.onrender.com/kri5H4nkr49Hu1c/contest')
        ]);
        
        if (!profileRes.ok || !contestRes.ok) throw new Error('Failed to fetch data');
        
        const profileData = await profileRes.json();
        const contestData = await contestRes.json();
        
        setProfile(profileData);
        setContestStats(contestData);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="achievements" className="section">
      <div className="container">
        <h2 className="section-title">Achievements</h2>
        
        <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
          
          {/* Static Milestone Card */}
          <motion.div 
            className="glass-panel"
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1rem' }}>Problems Solved</h3>
            <p className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1rem' }}>
              2300+
            </p>
            <p style={{ color: 'white', fontSize: '0.9rem' }}>
              Demonstrated mastery of complex Data Structures and Algorithms through rigorous, consistent practice.
            </p>
          </motion.div>

          {/* Live Rank Card */}
          <motion.div 
            className="glass-panel"
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1rem' }}>Live LeetCode Rank</h3>
            {loading ? (
              <p style={{ color: 'white' }}>Loading rank...</p>
            ) : error ? (
              <p style={{ color: '#f87171' }}>Unavailable</p>
            ) : profile && profile.ranking ? (
              <p className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1rem' }}>
                #{profile.ranking.toLocaleString()}
              </p>
            ) : (
              <p style={{ color: 'white' }}>Data not found</p>
            )}
            <p style={{ color: 'white', fontSize: '0.9rem' }}>
              Ranking among the top developers globally through high-volume problem solving.
            </p>
          </motion.div>

          {/* Elite Status Card */}
          <motion.div 
            className="glass-panel"
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '1rem' }}>Elite Status</h3>
            {loading ? (
              <p style={{ color: 'white' }}>Loading percentage...</p>
            ) : error ? (
              <p style={{ color: '#f87171' }}>Unavailable</p>
            ) : contestStats && contestStats.contestTopPercentage ? (
              <p className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '1rem' }}>
                Top {contestStats.contestTopPercentage}%
              </p>
            ) : (
              <p style={{ color: 'white' }}>Data not found</p>
            )}
            <p style={{ color: 'white', fontSize: '0.9rem' }}>
              Achieved elite status on the world's leading platform for software engineering technical interviews.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Achievements;
