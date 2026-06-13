const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  label: String,
  value: String
});

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  period: String,
  description: String
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  link: String,
  technologies: [String]
});

const skillSchema = new mongoose.Schema({
  name: String,
  level: Number, // e.g. 0 to 100
  category: String // e.g. 'Languages', 'Frameworks and Libraries'
});

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: String
});

module.exports = {
  Stat: mongoose.model('Stat', statSchema),
  Experience: mongoose.model('Experience', experienceSchema),
  Project: mongoose.model('Project', projectSchema),
  Skill: mongoose.model('Skill', skillSchema),
  Education: mongoose.model('Education', educationSchema)
};
