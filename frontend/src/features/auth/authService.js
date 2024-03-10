import axios from "axios";
import { BASE_URL } from "../../constants";

const API_URL = "api/users";
axios.defaults.withCredentials = true;

const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/${API_URL}`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}/${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
