import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import cover from "../assets/cover.svg";

const Login = () => {
  const [activeTab, setActiveTab] = useState("connexion");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerErrors, setRegisterErrors] = useState({});

  const [confirmRegisterPassword, setConfirmRegisterPassword] = useState("");
  const [confirmRegisterErrors, setConfirmRegisterErrors] = useState({});

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checkError, setCheckError] = useState("");

  const navigate = useNavigate();

  // VERIFICATION CONNEXION
  const validateLogin = () => {
    const loginErrors = {};

    // VALIDATION DE L'EMAIL
    if (!loginEmail) {
      loginErrors.loginEmail = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      loginErrors.loginEmail = "L'email est invalide";
    }

    // VALIDATION DU MOT DE PASSE
    if (!loginPassword) {
      loginErrors.loginPassword = "Le mot de passe est requis";
    } else if (loginPassword.length < 6) {
      loginErrors.loginPassword =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    setLoginErrors(loginErrors);
    return Object.keys(loginErrors).length === 0;
  };
  const handleLogin = (e) => {
    e.preventDefault();

    if (validateLogin()) {
      console.log("Email:", loginEmail);
      console.log("Mot de passe:", loginPassword);

      setLoginEmail("");
      setLoginPassword("");

      navigate("/home");
    }
  };

  // VERIFICATION INSCRIPTION
  const validateRegister = () => {
    const registerErrors = {};
    const confirmRegisterErrors = {};
    let checkError = "";

    // VALIDATION DE L'EMAIL
    if (!registerEmail) {
      registerErrors.registerEmail = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      registerErrors.registerEmail = "L'email est invalide";
    }

    // VALIDATION DU MOT DE PASSE
    if (!registerPassword) {
      registerErrors.registerPassword = "Le mot de passe est requis";
    } else if (registerPassword.length < 6) {
      registerErrors.registerPassword =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    // VALIDATION DE LA CONFIRMATION DU MOT DE PASSE
    if (registerPassword && !confirmRegisterPassword) {
      confirmRegisterErrors.confirmRegisterPassword =
        "Veuillez répéter votre mot de passe";
    } else if (registerPassword !== confirmRegisterPassword) {
      confirmRegisterErrors.confirmRegisterPassword =
        "Les deux mots de passe doivent être identiques";
    }

    // VERIFICATION DES CASES A COCHER
    if (registerEmail && registerPassword && confirmRegisterPassword) {
      if (!checked1 && !checked2) {
        checkError = "Veuillez selectionner votre statut";
      } else if (checked1 && checked2) {
        checkError = "Veuillez cocher une seule case";
      }
    }

    setRegisterErrors(registerErrors);
    setConfirmRegisterErrors(confirmRegisterErrors);
    setCheckError(checkError);

    return (
      Object.keys(registerErrors).length === 0 &&
      Object.keys(confirmRegisterErrors).length === 0 &&
      !checkError
    );
  };
  const handleRegister = (e) => {
    e.preventDefault();

    if (validateRegister()) {
      console.log("Email:", registerEmail);
      console.log("Mot de passe:", registerPassword);

      setRegisterEmail("");
      setRegisterPassword("");
      setConfirmRegisterPassword("");
      setChecked1(false);
      setChecked2(false);

      navigate("/home");
    }
  };

  const toggleLoginPassword = () => {
    setShowLoginPassword(!showLoginPassword);
  };
  const toggleRegisterPassword = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };
  const toggleRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const toggleCheck1 = () => {
    setChecked1(!checked1);
  };
  const toggleCheck2 = () => {
    setChecked2(!checked2);
  };

  const googleClick = () => {
    alert(`Email: ${registerEmail}\nMot de passe: ${registerPassword}`);
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* CONTENEUR POUR L'IMAGE DE FOND */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full flex flex-col">
        <div className="absolute top-[40%] left-[5%] flex flex-col">
          <h1 className="text-xl lg:text-2xl text-blue-600 font-extrabold my-4 z-10">
            Plateforme de suivi de santé
          </h1>
        </div>
        <div className="absolute top-[50%] left-[25%] flex flex-col">
          <h1 className="text-2xl text-blue-600 font-extrabold my-4 z-10">
            en ligne gratuit à Madagascar
          </h1>
        </div>
        <div className="relative w-full h-64 lg:h-full flex flex-col">
          <img
            src={cover}
            className="w-full min-h-[300px] lg:min-h-[600px] object-cover"
          />
        </div>
      </div>

      {/* CONENEUR DE LA CARDE CONNEXION ET INSCRIPTION */}
      {/* TAB CONNEXION ET INSCRIPTION */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center h-screen bg-gray-50">
        <div className="bg-white w-full lg:w-[85%] mx-auto h-auto p-5 rounded-xl shadow-xl">
          <div className="tabs flex justify-center gap-16 mb-2">
            <button
              className={`text-sm font-semibold ${
                activeTab === "connexion" ? "text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("connexion")}
            >
              Connexion
            </button>
            <button
              className={`text-sm font-semibold ${
                activeTab === "inscription" ? "text-blue-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("inscription")}
            >
              Inscription
            </button>
          </div>

          {/* ************************************************************** */}

          {/* CONNEXION PAGE  */}
          {activeTab === "connexion" ? (
            <div>
              <h2 className="text-lg font-bold text-center mb-5 mt-5">
                Connecté avec votre compte
              </h2>
              <form onSubmit={handleLogin}>
                {/* ADRESSE EMAIL */}
                <div className="mb-4 text-left">
                  <label
                    htmlFor="login-email"
                    className="block text-gray-700 text-sm"
                  >
                    Email
                  </label>
                  <input
                    id="login-email"
                    name="loginEmail"
                    // value={loginEmail}
                    type="email"
                    className={`${
                      loginErrors.loginEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full p-3 mt-2 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-400`}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Entrer votre adresse email"
                  />
                  {loginErrors.loginEmail && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.loginEmail}
                    </p>
                  )}
                </div>

                {/* MOT DE PASSE */}
                <div className="mb-6 text-left relative">
                  <label
                    htmlFor="login-password"
                    className="block text-gray-700 text-sm"
                  >
                    Mot de passe
                  </label>
                  <input
                    id="login-password"
                    name="loginPassword"
                    // value={loginPassword}
                    type={showLoginPassword ? "text" : "password"}
                    className={`${
                      loginErrors.loginPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full p-3 mt-2 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-400`}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Entrer votre mot de passe"
                  />
                  {loginErrors.loginPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {loginErrors.loginPassword}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={toggleLoginPassword}
                    className="absolute right-3 top-11 text-gray-500"
                  >
                    {showLoginPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>

                {/* BOUTTON DE CONNEXION */}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Connexion
                </button>
                <div className="flex flex-col justify-center items-center text-center">
                  <h3 className="mt-2 mb-2"> ou </h3>
                  <button
                    type="button"
                    className="flex justify-center items-center w-full px-4 py-2 bg-slate-200 text-black rounded hover:bg-blue-600"
                  >
                    <FcGoogle className="mr-2 text-lg" />
                    Connecter avec Google
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              {/* INSCRIPTION PAGE  */}
              <h2 className="text-lg font-bold text-center mb-5 mt-5">
                Créer un nouveau compte
              </h2>
              <form onSubmit={handleRegister}>
                {/* ADRESSE EMAIL */}
                <div className="mb-2 text-left text-sm">
                  <label
                    htmlFor="register-email"
                    className="block text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="register-email"
                    name="registerEmail"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className={`${
                      registerErrors.registerEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full p-3 mt-1 mb-2 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-400`}
                    placeholder="Ex : email@gmail.com"
                  />
                  {registerErrors.registerEmail && (
                    <p className="text-red-500 text-xs mt-1">
                      {registerErrors.registerEmail}
                    </p>
                  )}
                </div>

                {/* MOT DE PASSE */}
                <div className="mb-2 text-left text-sm relative">
                  <label
                    htmlFor="register-password"
                    className="block text-gray-700"
                  >
                    Mot de passe
                  </label>
                  <input
                    id="register-password"
                    name="registerPassword"
                    type={showRegisterPassword ? "text" : "password"}
                    className={`${
                      registerErrors.registerPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full p-3 mt-1 mb-2 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-400`}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Definissez un mot de passe"
                  />
                  {registerErrors.registerPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {registerErrors.registerPassword}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={toggleRegisterPassword}
                    className="absolute right-3 top-9 text-gray-500"
                  >
                    {showRegisterPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>

                {/* CONFIRM MOT DE PASSE */}
                <div className="mb-2 text-left text-sm relative">
                  <label
                    htmlFor="register-repassword"
                    className="block text-gray-700"
                  >
                    Confirmation mot de passe
                  </label>
                  <input
                    id="register-repassword"
                    name="registerRePassword"
                    type={showRepeatPassword ? "text" : "password"}
                    className={`${
                      confirmRegisterErrors.confirmRegisterPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } w-full p-3 mt-1 mb-2 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-400`}
                    value={confirmRegisterPassword}
                    onChange={(e) => setConfirmRegisterPassword(e.target.value)}
                    placeholder="Repéter votre mot de passe"
                  />
                  {confirmRegisterErrors.confirmRegisterPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {confirmRegisterErrors.confirmRegisterPassword}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={toggleRepeatPassword}
                    className="absolute right-3 top-9 text-gray-500"
                  >
                    {showRepeatPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </div>
                <div className="flex flex-row text-center justify-center mb-1">
                  <div className=" mr-40">
                    <input
                      className="mr-2"
                      type="checkbox"
                      checked={checked1}
                      onChange={toggleCheck1}
                    />
                    Docteur
                  </div>
                  <div className="items-center justify-center text-center">
                    <input
                      className="mr-2"
                      type="checkbox"
                      checked={checked2}
                      onChange={toggleCheck2}
                    />
                    Patient
                  </div>
                </div>
                {checkError && (
                  <p className="text-red-500 text-xs mb-2 text-center">
                    {checkError}
                  </p>
                )}

                {/* BOUTTON INSCRIPTION */}
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                  Inscription
                </button>
                <div className="flex flex-col justify-center items-center text-center">
                  <h3 className="mt-2 mb-2"> ou </h3>
                  <button
                    type="button"
                    className="flex justify-center items-center w-full px-4 py-2 bg-slate-200 text-black rounded hover:bg-blue-600"
                    onClick={googleClick}
                  >
                    <FcGoogle className="mr-2 text-lg" />
                    Inscription avec Google
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
