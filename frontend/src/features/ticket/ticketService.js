import axios from "axios";
import { BASE_URL } from "../../constants";

const API_URL = "api/tickets";
axios.defaults.withCredentials = true;

// Create new ticket
const createTicket = async (ticketData) => {
  const response = await axios.post(`${BASE_URL}/${API_URL}`, ticketData);
  return response.data;
};

const getTickets = async () => {
  const response = await axios.get(`${BASE_URL}/${API_URL}`);
  return response.data;
};

const getTicket = async (ticketId) => {
  const response = await axios.get(`${BASE_URL}/${API_URL}/${ticketId}`);
  return response.data;
};

const closeTicket = async (ticketId) => {
  const response = await axios.put(`${BASE_URL}/${API_URL}/${ticketId}`, {
    status: "closed",
  });

  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
