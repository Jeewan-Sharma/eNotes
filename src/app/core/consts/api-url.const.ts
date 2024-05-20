const BASE_URL = 'https://enotes-server.onrender.com';

const ENOTES = {
  LOGIN(): string {
    return `${BASE_URL}/auth/login`
  },
  REGISTER(): string {
    return `${BASE_URL}/auth/register`
  }
};

export const API_URL = {
  ENOTES
};
