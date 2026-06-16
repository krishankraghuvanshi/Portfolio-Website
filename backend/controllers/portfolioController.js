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
        submissionCalendar
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

    const submissionCalendar = solvedData.data?.matchedUser?.submissionCalendar || "{}";
    const acSubmissionNum = solvedData.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
    const solvedStats = {
      ranking: solvedData.data?.matchedUser?.profile?.ranking || 0,
      submissionCalendar: JSON.parse(submissionCalendar),
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

// Fetch Codeforces stats
exports.getCodeforcesStats = async (req, res) => {
  const username = req.params.username || 'Krishank';

  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${username}`),
      fetch(`https://codeforces.com/api/user.rating?handle=${username}`),
      fetch(`https://codeforces.com/api/user.status?handle=${username}`)
    ]);

    if (!infoRes.ok || !ratingRes.ok || !statusRes.ok) {
      throw new Error('Failed to fetch from Codeforces API');
    }

    const infoData = await infoRes.json();
    const ratingData = await ratingRes.json();
    const statusData = await statusRes.json();

    if (infoData.status !== 'OK' || ratingData.status !== 'OK' || statusData.status !== 'OK') {
      throw new Error('Codeforces API returned non-OK status');
    }

    const info = infoData.result?.[0] || {};
    const ratingHistory = ratingData.result || [];
    const okSubmissions = statusData.result?.filter(sub => sub.verdict === 'OK') || [];

    // Count unique solved problems and categorize by rating
    const solvedProblems = new Map();
    okSubmissions.forEach(sub => {
      const prob = sub.problem;
      if (prob && prob.contestId && prob.index) {
        const key = `${prob.contestId}-${prob.index}`;
        if (!solvedProblems.has(key)) {
          solvedProblems.set(key, prob.rating || null);
        }
      }
    });

    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    solvedProblems.forEach((rating) => {
      if (rating === null || rating === undefined || rating < 1200) {
        easySolved++;
      } else if (rating <= 1600) {
        mediumSolved++;
      } else {
        hardSolved++;
      }
    });

    const solvedStats = {
      solvedProblem: solvedProblems.size,
      easySolved,
      mediumSolved,
      hardSolved
    };

    const contestStats = {
      contestRating: info.rating || 0,
      maxRating: info.maxRating || 0,
      rank: info.rank || 'Unrated',
      maxRank: info.maxRank || 'Unrated',
      avatar: info.avatar || '',
      titlePhoto: info.titlePhoto || '',
      contestParticipation: ratingHistory.map(h => ({
        rating: h.newRating,
        contest: { title: h.contestName }
      }))
    };

    res.json({
      solved: solvedStats,
      contest: contestStats
    });

  } catch (error) {
    console.error('Error fetching Codeforces stats:', error);
    res.status(500).json({ message: 'Error fetching Codeforces stats' });
  }
};

// Fetch CodeChef stats
exports.getCodeChefStats = async (req, res) => {
  const username = req.params.username || 'krishhhank';

  try {
    const response = await fetch(`https://www.codechef.com/users/${username}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch CodeChef profile: ${response.status}`);
    }

    const html = await response.text();

    // 1. Current Rating
    const ratingMatch = html.match(/<div class="rating-number">[^0-9]*([0-9]+)[^0-9]*<\/div>/);
    const currentRating = ratingMatch ? parseInt(ratingMatch[1]) : 0;

    // 2. Highest Rating
    const highestRatingMatch = html.match(/<small>\s*\(Highest Rating\s+([0-9]+)\)\s*<\/small>/i);
    const highestRating = highestRatingMatch ? parseInt(highestRatingMatch[1]) : currentRating;

    // 3. Stars / Star rating
    let stars = '1★';
    if (currentRating >= 1400 && currentRating < 1600) stars = '2★';
    else if (currentRating >= 1600 && currentRating < 1800) stars = '3★';
    else if (currentRating >= 1800 && currentRating < 2000) stars = '4★';
    else if (currentRating >= 2000 && currentRating < 2200) stars = '5★';
    else if (currentRating >= 2200 && currentRating < 2500) stars = '6★';
    else if (currentRating >= 2500) stars = '7★';

    // 4. Global Rank
    const globalRankMatch = html.match(/<a href="\/ratings\/all">\s*<strong>\s*([0-9]+)\s*<\/strong>/i);
    const globalRank = globalRankMatch ? parseInt(globalRankMatch[1]) : 0;

    // 5. Country Rank
    const countryRankMatch = html.match(/<a href="\/ratings\/all\?filterBy=Country%3DIndia">\s*<strong>\s*([0-9]+)\s*<\/strong>/i) ||
                             html.match(/<a href="\/ratings\/all\?filterBy=[^"]+">\s*<strong>\s*([0-9]+)\s*<\/strong>/i);
    const countryRank = countryRankMatch ? parseInt(countryRankMatch[1]) : 0;

    // 6. Total Problems Solved
    const solvedMatch = html.match(/<h3>Total Problems Solved:\s*([0-9]+)<\/h3>/i);
    const solvedCount = solvedMatch ? parseInt(solvedMatch[1]) : 0;

    // 7. Rating History Graph
    const historyMatch = html.match(/var all_rating = ([^;]+);/);
    let contestParticipation = [];
    if (historyMatch) {
      try {
        const rawHistory = JSON.parse(historyMatch[1]);
        contestParticipation = rawHistory.map(h => ({
          rating: parseInt(h.rating),
          contest: { title: h.name }
        }));
      } catch (e) {
        console.error("Error parsing CodeChef rating history:", e);
      }
    }

    res.json({
      solved: {
        solvedProblem: solvedCount
      },
      contest: {
        contestRating: currentRating,
        highestRating,
        stars,
        globalRank,
        countryRank,
        contestParticipation
      }
    });

  } catch (error) {
    console.error('Error fetching CodeChef stats:', error);
    res.status(500).json({ message: 'Error fetching CodeChef stats' });
  }
};


