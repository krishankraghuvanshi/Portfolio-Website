const { Stat, Experience, Project, Skill, Education } = require('../models/Portfolio');
const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
    await mongoose.connect(uri);
  }
};

// Fetch all portfolio data
exports.getPortfolioData = async (req, res) => {
  try {
    await connectDB();
    const stats = await Stat.find({});
    const experiences = await Experience.find({});
    const projects = await Project.find({});
    const skills = await Skill.find({});
    const education = await Education.find({});

    res.json({
      stats,
      experiences,
      projects,
      skills,
      education
    });
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const nodemailer = require('nodemailer');

// Handle contact form submission
exports.submitContactForm = async (req, res) => {
  try {
    await connectDB();
    const { name, email, message } = req.body;
    
    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `New Portfolio Contact from ${name}`,
      text: `You have a new message from your portfolio website!

Name: ${name}
Email: ${email}
Message: 
${message}`,
      replyTo: email
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email notification sent successfully.');
    
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Fetch LeetCode stats via GraphQL proxy
exports.getLeetCodeStats = async (req, res) => {
  const username = req.params.username || 'kri5H4nkr49Hu1c';
  
  const solvedQuery = `
    query userProblemsSolved($username: String!) {
      matchedUser(username: $username) {
        profile { ranking }
        submitStatsGlobal {
          acSubmissionNum { difficulty count }
        }
      }
    }
  `;

  const contestQuery = `
    query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        rating
        globalRanking
        topPercentage
        badge { name }
      }
      userContestRankingHistory(username: $username) {
        rating
        contest { title }
      }
    }
  `;

  try {
    const [solvedRes, contestRes] = await Promise.all([
      fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: solvedQuery, variables: { username } })
      }),
      fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: contestQuery, variables: { username } })
      })
    ]);

    if (!solvedRes.ok || !contestRes.ok) {
      throw new Error('Failed to fetch from LeetCode GraphQL');
    }

    const solvedData = await solvedRes.json();
    const contestData = await contestRes.json();

    const acSubmissionNum = solvedData.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
    const solvedStats = {
      ranking: solvedData.data?.matchedUser?.profile?.ranking || 0,
      solvedProblem: acSubmissionNum.find(s => s.difficulty === 'All')?.count || 0,
      easySolved: acSubmissionNum.find(s => s.difficulty === 'Easy')?.count || 0,
      mediumSolved: acSubmissionNum.find(s => s.difficulty === 'Medium')?.count || 0,
      hardSolved: acSubmissionNum.find(s => s.difficulty === 'Hard')?.count || 0,
    };

    const contestRanking = contestData.data?.userContestRanking || {};
    const contestHistory = contestData.data?.userContestRankingHistory || [];
    
    const contestStats = {
      contestRating: contestRanking.rating || 0,
      contestGlobalRanking: contestRanking.globalRanking || 0,
      contestTopPercentage: contestRanking.topPercentage || 0,
      contestBadges: { name: contestRanking.badge?.name || null },
      contestParticipation: contestHistory.map(h => ({
        rating: h.rating,
        contest: { title: h.contest?.title }
      }))
    };

    res.json({
      solved: solvedStats,
      contest: contestStats
    });

  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    res.status(500).json({ message: 'Error fetching LeetCode stats' });
  }
};
