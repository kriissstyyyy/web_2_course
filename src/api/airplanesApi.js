import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const getAirplanes = async (params = {}) => {
  const response = await axios.get(`${API_URL}/airplanes`, { params });
  return response.data;
};

export const getAirplaneById = async (id) => {
  const response = await axios.get(`${API_URL}/airplanes/${id}`);
  return response.data;
};
