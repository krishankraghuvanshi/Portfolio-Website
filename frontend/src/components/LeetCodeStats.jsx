import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LeetCodeStats = () => {
  const [stats, setStats] = useState(null);
  const [contestStats, setContestStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [solvedRes, contestRes] = await Promise.all([
          fetch('https://alfa-leetcode-api.onrender.com/kri5H4nkr49Hu1c/solved'),
          fetch('https://alfa-leetcode-api.onrender.com/kri5H4nkr49Hu1c/contest')
        ]);
        
        if (!solvedRes.ok || !contestRes.ok) throw new Error('Failed to fetch data');
        
        const solvedData = await solvedRes.json();
        const contestData = await contestRes.json();
        
        setStats(solvedData);
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

  const formatChartData = () => {
    if (!contestStats || !contestStats.contestParticipation) return [];
    return contestStats.contestParticipation.map((contest, index) => ({
      name: `C${index + 1}`,
      rating: Math.round(contest.rating),
      title: contest.contest.title
    }));
  };

  const chartData = formatChartData();

  return (
    <section id="leetcode" className="section">
      <div className="container">
        <h2 className="section-title">LeetCode Stats</h2>
        
        {loading && (
          <div style={{ textAlign: 'center', color: 'white', padding: '2rem' }}>
            <p>Loading real-time stats...</p>
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: 'center', color: '#f87171', padding: '2rem' }}>
            <p>Failed to load LeetCode statistics. Please try again later.</p>
          </div>
        )}

        {stats && contestStats && !loading && !error && (
          <div className="grid grid-cols-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '1.5rem' }}>
            
            {/* Top Row: Total Solved & Contest Rating */}
            <motion.div 
              className="glass-panel"
              style={{ textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>Total Solved</h3>
              <p className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>
                {stats.solvedProblem}
              </p>
            </motion.div>

            <motion.div 
              className="glass-panel"
              style={{ textAlign: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>Contest Rating</h3>
              <p className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>
                {Math.round(contestStats.contestRating)}
              </p>
              {contestStats.contestBadges && contestStats.contestBadges.name && (
                <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 1rem', background: 'rgba(168, 85, 247, 0.2)', color: 'var(--accent-secondary)', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
                  {contestStats.contestBadges.name}
                </span>
              )}
            </motion.div>

            {/* Middle Row: Difficulty Breakdown */}
            <motion.div 
              className="glass-panel"
              style={{ textAlign: 'center', borderColor: 'rgba(74, 222, 128, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 style={{ color: '#4ade80', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Easy</h4>
              <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{stats.easySolved}</p>
            </motion.div>

            <motion.div 
              className="glass-panel"
              style={{ textAlign: 'center', borderColor: 'rgba(250, 204, 21, 0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 style={{ color: '#facc15', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Medium</h4>
              <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{stats.mediumSolved}</p>
            </motion.div>

            <motion.div 
              className="glass-panel"
              style={{ textAlign: 'center', borderColor: 'rgba(248, 113, 113, 0.3)', gridColumn: '1 / -1', maxWidth: '50%', margin: '0 auto', width: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 style={{ color: '#f87171', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Hard</h4>
              <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{stats.hardSolved}</p>
            </motion.div>

            {/* Bottom Row: Rating Graph */}
            {chartData.length > 0 && (
              <motion.div 
                className="glass-panel"
                style={{ gridColumn: '1 / -1', padding: '2rem 1rem 1rem 1rem' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Rating History</h4>
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis domain={['auto', 'auto']} stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--accent-secondary)' }}
                        labelStyle={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold' }}
                        formatter={(value) => [value, 'Rating']}
                        labelFormatter={(label, payload) => payload && payload.length > 0 ? payload[0].payload.title : label}
                      />
                      <Line type="monotone" dataKey="rating" stroke="var(--accent-secondary)" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: 'var(--accent-primary)' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

          </div>
        )}
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="https://leetcode.com/u/kri5H4nkr49Hu1c/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline', textDecorationColor: 'white', textUnderlineOffset: '4px' }}>
            View Full Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeStats;
