import axios from 'axios';

const CORS_PROXY_URL = 'https://corsproxy.io/?';  // Route through proxy server to circumvent CORS Same-Origin Policy
const BASE_URL = 'https://xbl.io';
const API_KEY = 'c5b30519-47a9-450b-b2e2-23837ae64562';

const apiService = axios.create({
  baseURL: CORS_PROXY_URL + BASE_URL,
  headers: {
    'X-Authorization': API_KEY,
    'Content-Type': 'application/json',
  },
});

export const getClips = async () => {
  try {
    const response = await apiService.get('/api/v2/dvr/gameclips');
    return response.data;
  } catch (error) {
    throw error;
  }
};

console.log(getClips());

export default apiService;