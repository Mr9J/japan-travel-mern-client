import axios from "axios";
const API_URL = "https://scy-japan-travel-mern-api.onrender.com/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, password_confirm) {
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
      password_confirm,
    });
  }

  findCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

const authService = new AuthService();

export default authService;
