// CONTENEUR CARD CONNEXION ET INSCRIPTION
<div className="relative w-1/2 h-full p-10 flex flex-col">
  <div className="bg-white w-[85%] h-full p-5 ml-10 mt-2  rounded-xl shadow-xl">
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
        <form>
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
              // value={loginEmail}
              type="email"
              className="w-full p-3 mt-2 border border-gray-300 focus:outline-none rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Entrer votre adresse email"
            />
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
              // value={loginPassword}
              type={showPassword ? "text" : "password"}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Entrer votre mot de passe"
            />
            <button
              type="button"
              onClick={toggleRePassword}
              className="absolute right-3 top-11 text-gray-500"
            >
              {showRePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* BOUTTON DE CONNEXION */}
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Connexion
          </button>
          <div className="flex flex-col justify-center items-center text-center">
            <h3 className="mt-2 mb-2"> ou </h3>
            <button className="flex justify-center items-center w-full px-4 py-2 bg-slate-200 text-black rounded hover:bg-blue-600">
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
        <form>
          {/* ADRESSE EMAIL */}
          <div className="mb-2 text-left text-sm">
            <label htmlFor="register-email" className="block text-gray-700">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              className="w-full p-3 mt-1 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Entrer votre adresse email"
            />
          </div>

          {/* MOT DE PASSE */}
          <div className="mb-2 text-left text-sm relative">
            <label htmlFor="register-password" className="block text-gray-700">
              Mot de passe
            </label>
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              className="w-full p-3 mt-1 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Definissez un mot de passe"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
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
              type={showRePassword ? "text" : "password"}
              className="w-full p-3 mb-5 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Repéter votre mot de passe"
            />
            <button
              type="button"
              onClick={toggleRePassword}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showRePassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* BOUTTON INSCRIPTION */}
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
            Inscription
          </button>
          <div className="flex flex-col justify-center items-center text-center">
            <h3 className="mt-2 mb-2"> ou </h3>
            <button className="flex justify-center items-center w-full px-4 py-2 bg-slate-200 text-black rounded hover:bg-blue-600">
              <FcGoogle className="mr-2 text-lg" />
              Inscription avec Google
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
</div>;
