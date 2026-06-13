const mongoose = require('mongoose');
require('dotenv').config();
const { Stat, Experience, Project, Skill, Education } = require('./models/Portfolio');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB. Clearing old data...');
    
    await Stat.deleteMany({});
    await Experience.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Education.deleteMany({});

    console.log('Seeding new data...');

    // Stats removed

    await Experience.insertMany([
      {
        role: 'Full Stack Developer',
        company: 'Tech Solutions Inc.',
        period: '2023 - Present',
        description: 'Developed scalable web applications using the MERN stack. Improved performance by 30%.'
      },
      {
        role: 'Frontend Engineer',
        company: 'Creative Agency',
        period: '2021 - 2023',
        description: 'Built interactive and responsive UIs with React and Tailwind CSS. Integrated animations using Framer Motion.'
      }
    ]);

    await Project.insertMany([
      {
        title: 'Resume Reviewer',
        description: 'An AI-powered application to analyze and enhance resumes for ATS optimization.',
        imageUrl: 'https://via.placeholder.com/600x400/1e1e24/ffffff?text=Resume+Reviewer',
        link: 'https://www.rankresu.me/',
        technologies: ['React', 'Node.js', 'MongoDB', 'AI']
      },
      {
        title: 'Chess Engine',
        description: 'A custom chess engine built with a Machine Learning evaluator for intelligent move generation.',
        imageUrl: 'https://via.placeholder.com/600x400/1e1e24/ffffff?text=Chess+Engine',
        link: 'https://github.com/krishankraghuvanshi/chess_engine',
        technologies: ['Python', 'Machine Learning']
      },
      {
        title: 'Movie Recommendation System',
        description: 'A recommendation engine that suggests movies based on user preferences and viewing history.',
        imageUrl: 'https://via.placeholder.com/600x400/1e1e24/ffffff?text=Movie+Recommender',
        link: 'https://github.com/krishankraghuvanshi/movie_recommendation_system',
        technologies: ['Python', 'Pandas', 'Scikit-Learn']
      },
      {
        title: 'Chat Application',
        description: 'A real-time chat application with instant messaging and user presence indicators.',
        imageUrl: 'https://via.placeholder.com/600x400/1e1e24/ffffff?text=Chat+App',
        link: 'https://github.com/krishankraghuvanshi/mern-Chat-app',
        technologies: ['React', 'Socket.io', 'Node.js']
      }
    ]);

    await Skill.insertMany([
      // Languages
      { name: 'Python', level: 90, category: 'Languages' },
      { name: 'Java', level: 85, category: 'Languages' },
      { name: 'JavaScript', level: 90, category: 'Languages' },
      { name: 'C++', level: 85, category: 'Languages' },
      { name: 'SQL', level: 85, category: 'Languages' },
      { name: 'HTML', level: 95, category: 'Languages' },
      { name: 'CSS', level: 85, category: 'Languages' },
      { name: 'C', level: 80, category: 'Languages' },
      // Frameworks and Libraries
      { name: 'React', level: 90, category: 'Frameworks and Libraries' },
      { name: 'Node', level: 85, category: 'Frameworks and Libraries' },
      { name: 'Express', level: 85, category: 'Frameworks and Libraries' },
      { name: 'FastAPI', level: 80, category: 'Frameworks and Libraries' },
      { name: 'Scikit-learn', level: 75, category: 'Frameworks and Libraries' },
      { name: 'Pandas', level: 80, category: 'Frameworks and Libraries' },
      { name: 'NumPy', level: 80, category: 'Frameworks and Libraries' },
      { name: 'LangChain', level: 70, category: 'Frameworks and Libraries' },
      { name: 'Django', level: 80, category: 'Frameworks and Libraries' },
      // Tools & Infrastructure
      { name: 'Git', level: 85, category: 'Tools & Infrastructure' },
      { name: 'Docker', level: 80, category: 'Tools & Infrastructure' },
      { name: 'MySQL', level: 85, category: 'Tools & Infrastructure' },
      { name: 'MongoDB', level: 85, category: 'Tools & Infrastructure' },
      { name: 'Linux', level: 80, category: 'Tools & Infrastructure' },
      // Concepts
      { name: 'Data Structures & Algorithms', level: 90, category: 'Concepts' },
      { name: 'Competitive Programming', level: 85, category: 'Concepts' },
      { name: 'Machine Learning', level: 80, category: 'Concepts' },
      { name: 'REST APIs', level: 90, category: 'Concepts' },
      { name: 'Object Oriented Programming', level: 85, category: 'Concepts' },
      { name: 'Operating Systems', level: 80, category: 'Concepts' }
    ]);

    await Education.insertMany([
      {
        degree: 'Bachelor of Technology - BTech, Computer Science and Engineering',
        institution: 'KIET Group of Institutions',
        year: 'Aug 2023 – Aug 2027'
      }
    ]);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
