import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToggleTheme } from "../utils";
import Input from "../composants/Input";
import { Lock, Mail } from "lucide-react";

const Login = () => {
  const [showPass, setShowPass] = useState(true);

  return (
    <div className="h-screen w-full flex p-3 ">
      <div className="absolute top-0 right-0 m-5 z-50">
        <ToggleTheme />
      </div>

      <div className="w-full md:w-1/2 card  p-10">
        <div className="card bg-base-100 w-full shadow-md my-auto shadow-info">
          <div className="text-center px-5 pt-5 pb-2">
            <h1 className="font-black text-2xl text-base-500 mb-2">
              CONNEXION
            </h1>
            <p className="font-mono text-gray-600">Connectez à votre compte</p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <div className="mx-5 space-y-3">
              <Input
                label="Adresse email"
                type="email"
                name="email"
                placeholder="exemple@gmail.com"
                icon={Mail}
              />
              <Input
                label="Mot de passe"
                type={showPass ? "password" : "text"}
                name="password"
                placeholder="Entrer votre mot de passe"
                icon={Lock}
                showEditIcon={true}
                togglePass={() => setShowPass(!showPass)}
              />
            </div>
          </div>

          <div className="card-actions justify-center block mx-10">
            <p className="text-end my-3 text-blue-600 font-semibold cursor-pointer">
              Mot de passe oublier ?
            </p>

            <button className="btn btn-primary w-full">Connexion</button>

            <p className="text-center m-1">ou</p>

            <button className="btn btn-soft btn-primary w-full mb-5">
              <img src="/google.svg" alt="google ico" className="w-5" />
              Connecter avec Google
            </button>

            <div className="flex justify-center">
              <p className="mr-2 mb-5">Nouveau membre ? </p>
              <NavLink
                to="/"
                className="text-blue-500 font-bold cursor-pointer"
              >
                Créer un compte
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/login.svg"
        alt="login img"
        className="md:w-1/2 hidden md:block"
      />
    </div>
  );
};

export default Login;
