import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import authService from "../services/authService";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");

    try {
      const authData = authService.handleGoogleCallback(token, userData);
      setUser(authData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      navigate("/login");
    }
  }, [navigate, searchParams, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Authentification en cours...
        </h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthSuccess;
