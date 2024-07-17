const BASE_URL = 'https://enotes-server.onrender.com';
// const BASE_URL = 'http://localhost:6969';

const ENOTES = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  GET_USER: `${BASE_URL}/user`,
  GET_NOTES: `${BASE_URL}/notes`,
  CREATE_NOTES: `${BASE_URL}/notes`,
  DELETE_NOTES: `${BASE_URL}/note`,
  UPDATE_NOTES: `${BASE_URL}/note`,
  SET_NOTES_IMPORTANCE: `${BASE_URL}/note/set-importance`,
  GET_IMPORTANT_NOTES: `${BASE_URL}/notes/important`,
  GET_NOTES_TAGS: `${BASE_URL}/notes/tags`,
  GET_NOTES_BY_TAGS: `${BASE_URL}/notes/notes-by-tag`,
  SEARCH: `${BASE_URL}/notes/search`
};

export const API_URL = {
  ENOTES
};
