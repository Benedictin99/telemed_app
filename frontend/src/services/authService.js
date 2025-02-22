import axios from "../config/axios";

// Service d'authentification
class AuthService {
  // Inscription
  async register(name, email, password) {
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      if (error.response?.data?.message) {
        throw error.response.data.message;
      } else if (error.message) {
        throw error.message;
      } else {
        throw "Erreur lors de l'inscription";
      }
    }
  }

  // Connexion
  async login(email, password) {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Erreur lors de la connexion";
    }
  }

  // Déconnexion
  logout() {
    localStorage.removeItem("user");
    sessionStorage.clear();
  }

  // Récupérer l'utilisateur courant
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  // Authentification Google
  initiateGoogleAuth() {
    window.location.href = "http://localhost:5000/api/auth/google";
  }

  // Gérer le retour de Google
  handleGoogleCallback(token, userData) {
    if (token && userData) {
      const user = JSON.parse(userData);
      const authData = { ...user, token };
      localStorage.setItem("user", JSON.stringify(authData));
      return authData;
    }
    throw new Error("Échec de l'authentification Google");
  }
}

export default new AuthService();
