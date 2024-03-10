import axios from "axios";
import { BASE_URL } from "../../constants";

const API_URL = "api/tickets/";
axios.defaults.withCredentials = true;

// Get ticket notes
const getNotes = async (ticketId) => {
  const response = await axios.get(`${BASE_URL}/${API_URL}${ticketId}/notes`);
  return response.data;
};

const createNote = async (noteText, ticketId, token) => {
  const response = await axios.post(`${BASE_URL}/${API_URL}${ticketId}/notes`, {
    text: noteText,
  });
  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
