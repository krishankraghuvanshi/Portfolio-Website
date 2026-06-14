import axios from 'axios';

// Use relative /_/backend/api for Vercel production, and localhost for local development
const API_URL = import.meta.env.PROD ? '/_/backend/api' : 'http://localhost:4000/api';

export const fetchPortfolioData = async () => {
  try {
    const response = await axios.get(`${API_URL}/portfolio-data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    throw error;
  }
};

export const submitContact = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const fetchLeetCodeStats = async (username = 'kri5H4nkr49Hu1c') => {
  try {
    const response = await axios.get(`${API_URL}/leetcode/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    throw error;
  }
};
