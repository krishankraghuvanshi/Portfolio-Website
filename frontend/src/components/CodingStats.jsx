import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { fetchLeetCodeStats, fetchCodeforcesStats, fetchCodeChefStats } from '../services/api';

const CodingStats = () => {
  const [activeTab, setActiveTab] = useState('leetcode');
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [codeforcesData, setCodeforcesData] = useState(null);
  const [codechefData, setCodechefData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        const [lc, cf, cc] = await Promise.all([
          fetchLeetCodeStats('kri5H4nkr49Hu1c'),
          fetchCodeforcesStats('Krishank'),
          fetchCodeChefStats('krishhhank')
        ]);
        setLeetcodeData(lc);
        setCodeforcesData(cf);
        setCodechefData(cc);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllStats();
  }, []);

  const formatLCChartData = () => {
    if (!leetcodeData || !leetcodeData.contest || !leetcodeData.contest.contestParticipation) return [];
    return leetcodeData.contest.contestParticipation.map((contest, index) => ({
      name: `C${index + 1}`,
      rating: Math.round(contest.rating),
      title: contest.contest.title
    }));
  };

  const formatCFChartData = () => {
    if (!codeforcesData || !codeforcesData.contest || !codeforcesData.contest.contestParticipation) return [];
    return codeforcesData.contest.contestParticipation.map((contest, index) => ({
      name: `C${index + 1}`,
      rating: Math.round(contest.rating),
      title: contest.contest.title
    }));
  };

  const formatCCChartData = () => {
    if (!codechefData || !codechefData.contest || !codechefData.contest.contestParticipation) return [];
    return codechefData.contest.contestParticipation.map((contest, index) => ({
      name: `C${index + 1}`,
      rating: Math.round(contest.rating),
      title: contest.contest.title
    }));
  };

  const lcChartData = formatLCChartData();
  const cfChartData = formatCFChartData();
  const ccChartData = formatCCChartData();

  // Color palette and theme helpers
  const accentColor = 
    activeTab === 'leetcode' ? 'var(--accent-secondary)' : 
    activeTab === 'codeforces' ? '#3b82f6' : '#d97706';

  const accentGradient = 
    activeTab === 'leetcode' ? 'linear-gradient(135deg, #a855f7, #6366f1)' : 
    activeTab === 'codeforces' ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' : 
    'linear-gradient(135deg, #fbbf24, #d97706)';

  return (
    <section id="coding-stats" className="section">
      <div className="container">
        {/* Section Title & Logo GIF */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Coding Profiles</h2>
          <a href="https://emoji.gg/emoji/533693-capookeyboardslam" target="_blank" rel="noopener noreferrer" style={{ display: 'flex' }}>
            <img src="https://cdn3.emoji.gg/emojis/533693-capookeyboardslam.gif" width="64" height="64" alt="CapooKeyboardSlam" />
          </a>
        </div>

        {/* Custom Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', background: 'rgba(255, 255, 255, 0.03)', padding: '6px', borderRadius: '50px', border: '1px solid var(--glass-border)', position: 'relative', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' }}>
            
            {/* LeetCode Tab Button */}
            <button
              onClick={() => setActiveTab('leetcode')}
              style={{
                padding: '0.6rem 2rem',
                borderRadius: '50px',
                border: 'none',
                background: 'transparent',
                color: activeTab === 'leetcode' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.3s ease'
              }}
            >
              LeetCode
              {activeTab === 'leetcode' && (
                <motion.div
                  layoutId="activeTabBackground"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                    zIndex: -1
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* Codeforces Tab Button */}
            <button
              onClick={() => setActiveTab('codeforces')}
              style={{
                padding: '0.6rem 2rem',
                borderRadius: '50px',
                border: 'none',
                background: 'transparent',
                color: activeTab === 'codeforces' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.3s ease'
              }}
            >
              Codeforces
              {activeTab === 'codeforces' && (
                <motion.div
                  layoutId="activeTabBackground"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    zIndex: -1
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            {/* CodeChef Tab Button */}
            <button
              onClick={() => setActiveTab('codechef')}
              style={{
                padding: '0.6rem 2rem',
                borderRadius: '50px',
                border: 'none',
                background: 'transparent',
                color: activeTab === 'codechef' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.3s ease'
              }}
            >
              CodeChef
              {activeTab === 'codechef' && (
                <motion.div
                  layoutId="activeTabBackground"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                    zIndex: -1
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', color: 'white', padding: '4rem 0' }}>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.6)' }}>Loading coding profile stats...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{ textAlign: 'center', color: '#f87171', padding: '4rem 0' }}>
            <p>Failed to load profile statistics. Please try again later.</p>
          </div>
        )}

        {/* Stats Content */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {activeTab === 'leetcode' && leetcodeData && (
              <motion.div
                key="leetcode-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2"
                style={{ maxWidth: '900px', margin: '0 auto', gap: '1.5rem' }}
              >
                {/* Total Solved Card */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>Total Solved</h3>
                  <p style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, background: accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {leetcodeData.solved.solvedProblem}
                  </p>
                </motion.div>

                {/* Contest Rating Card */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>Contest Rating</h3>
                  <p style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, background: accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {Math.round(leetcodeData.contest.contestRating)}
                  </p>
                  {leetcodeData.contest.contestBadges && leetcodeData.contest.contestBadges.name && (
                    <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 1rem', background: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-secondary)', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
                      {leetcodeData.contest.contestBadges.name}
                    </span>
                  )}
                </motion.div>

                {/* Difficulty Breakdowns */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center', borderColor: 'rgba(74, 222, 128, 0.2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 style={{ color: '#4ade80', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Easy</h4>
                  <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{leetcodeData.solved.easySolved}</p>
                </motion.div>

                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center', borderColor: 'rgba(250, 204, 21, 0.2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 style={{ color: '#facc15', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Medium</h4>
                  <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{leetcodeData.solved.mediumSolved}</p>
                </motion.div>

                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center', borderColor: 'rgba(248, 113, 113, 0.2)', gridColumn: '1 / -1', maxWidth: '50%', margin: '0 auto', width: '100%' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 style={{ color: '#f87171', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Hard</h4>
                  <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{leetcodeData.solved.hardSolved}</p>
                </motion.div>

                {/* Rating Graph */}
                {lcChartData.length > 0 && (
                  <motion.div 
                    className="glass-panel"
                    style={{ gridColumn: '1 / -1', padding: '2rem 1rem 1.5rem 1rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Rating History</h4>
                    <div style={{ width: '100%', height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lcChartData}>
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis domain={['auto', 'auto']} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                            itemStyle={{ color: accentColor }}
                            labelStyle={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold' }}
                            formatter={(value) => [value, 'Rating']}
                            labelFormatter={(label, payload) => payload && payload.length > 0 ? payload[0].payload.title : label}
                          />
                          <Line type="monotone" dataKey="rating" stroke={accentColor} strokeWidth={3} dot={false} activeDot={{ r: 6, fill: 'white' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {/* Profile Link */}
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1.5rem' }}>
                  <a href="https://leetcode.com/u/kri5H4nkr49Hu1c/" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline', textDecorationColor: 'white', textUnderlineOffset: '4px' }}>
                    View Full LeetCode Profile
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'codeforces' && codeforcesData && (
              <motion.div
                key="codeforces-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2"
                style={{ maxWidth: '900px', margin: '0 auto', gap: '1.5rem' }}
              >
                {/* CF Profile Header card (Grid span 2) */}
                <motion.div 
                  className="glass-panel"
                  style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {codeforcesData.contest.avatar && (
                    <img 
                      src={codeforcesData.contest.avatar} 
                      alt="Codeforces Avatar" 
                      style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #3b82f6', objectFit: 'cover' }}
                    />
                  )}
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 700 }}>{codeforcesData.contest.rank.toUpperCase()}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
                      Handle: <span style={{ color: '#3b82f6', fontWeight: 600 }}>{codeforcesData.contest.handle || 'Krishank'}</span>
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                      Max Rank: <span style={{ color: '#60a5fa' }}>{codeforcesData.contest.maxRank}</span>
                    </p>
                  </div>
                </motion.div>

                {/* Total Solved Card */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>Total Solved</h3>
                  <p style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, background: accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {codeforcesData.solved.solvedProblem}
                  </p>
                </motion.div>

                {/* Contest Rating Card */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>Contest Rating</h3>
                  <p style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, background: accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {codeforcesData.contest.contestRating}
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 1rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
                    Max: {codeforcesData.contest.maxRating}
                  </span>
                </motion.div>

                {/* Rating Graph */}
                {cfChartData.length > 0 && (
                  <motion.div 
                    className="glass-panel"
                    style={{ gridColumn: '1 / -1', padding: '2rem 1rem 1.5rem 1rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Rating History</h4>
                    <div style={{ width: '100%', height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cfChartData}>
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis domain={['auto', 'auto']} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                            itemStyle={{ color: accentColor }}
                            labelStyle={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold' }}
                            formatter={(value) => [value, 'Rating']}
                            labelFormatter={(label, payload) => payload && payload.length > 0 ? payload[0].payload.title : label}
                          />
                          <Line type="monotone" dataKey="rating" stroke={accentColor} strokeWidth={3} dot={false} activeDot={{ r: 6, fill: 'white' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {/* Profile Link */}
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1.5rem' }}>
                  <a href="https://codeforces.com/profile/Krishank" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline', textDecorationColor: 'white', textUnderlineOffset: '4px' }}>
                    View Full Codeforces Profile
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'codechef' && codechefData && (
              <motion.div
                key="codechef-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2"
                style={{ maxWidth: '900px', margin: '0 auto', gap: '1.5rem' }}
              >
                {/* CodeChef Profile Header Card (Grid span 2) */}
                <motion.div 
                  className="glass-panel"
                  style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 700 }}>
                      CodeChef Stars: <span style={{ color: '#fbbf24', textShadow: '0 0 10px rgba(251, 191, 36, 0.4)' }}>{codechefData.contest.stars}</span>
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem' }}>
                      Handle: <span style={{ color: '#d97706', fontWeight: 600 }}>krishhhank</span>
                    </p>
                  </div>
                </motion.div>

                {/* Total Solved Card */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>Total Solved</h3>
                  <p style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, background: accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {codechefData.solved.solvedProblem}
                  </p>
                </motion.div>

                {/* Contest Rating Card */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem' }}>Contest Rating</h3>
                  <p style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1, background: accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {codechefData.contest.contestRating}
                  </p>
                  <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.2rem 1rem', background: 'rgba(217, 119, 6, 0.15)', color: '#fbbf24', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 600 }}>
                    Max: {codechefData.contest.highestRating}
                  </span>
                </motion.div>

                {/* Global Rank Card */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center', borderColor: 'rgba(217, 119, 6, 0.2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Global Rank</h4>
                  <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{codechefData.contest.globalRank || 'N/A'}</p>
                </motion.div>

                {/* Country Rank Card */}
                <motion.div 
                  className="glass-panel"
                  style={{ textAlign: 'center', borderColor: 'rgba(217, 119, 6, 0.2)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 style={{ color: '#fbbf24', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Country Rank</h4>
                  <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'white' }}>{codechefData.contest.countryRank || 'N/A'}</p>
                </motion.div>

                {/* Rating Graph */}
                {ccChartData.length > 0 && (
                  <motion.div 
                    className="glass-panel"
                    style={{ gridColumn: '1 / -1', padding: '2rem 1rem 1.5rem 1rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>Rating History</h4>
                    <div style={{ width: '100%', height: '300px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={ccChartData}>
                          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis domain={['auto', 'auto']} stroke="rgba(255,255,255,0.4)" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                            itemStyle={{ color: accentColor }}
                            labelStyle={{ color: 'white', marginBottom: '0.5rem', fontWeight: 'bold' }}
                            formatter={(value) => [value, 'Rating']}
                            labelFormatter={(label, payload) => payload && payload.length > 0 ? payload[0].payload.title : label}
                          />
                          <Line type="monotone" dataKey="rating" stroke={accentColor} strokeWidth={3} dot={false} activeDot={{ r: 6, fill: 'white' }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                )}

                {/* Profile Link */}
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '1.5rem' }}>
                  <a href="https://www.codechef.com/users/krishhhank" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline', textDecorationColor: 'white', textUnderlineOffset: '4px' }}>
                    View Full CodeChef Profile
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
};

export default CodingStats;
