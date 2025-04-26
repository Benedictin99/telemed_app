import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToggleTheme } from "../utils";
import Input from "../composants/Input";
import { Lock, Mail, User } from "lucide-react";

const Register = () => {
  const [showPass, setShowPass] = useState(true);
  const [showRepass, setShowRepass] = useState(true);

  const [name, setName] = useState("");

  return (
    <div className="h-screen w-full flex p-3 bg-base-100">
      <div className="absolute top-0 left-0 m-5 z-50">
        <ToggleTheme />
      </div>
      <img
        src="/register.svg"
        alt="login img"
        className="hidden md:block md:w-1/2"
      />
      <div className="w-full md:w-1/2 card px-10">
        <div className="card bg-base-100 w-full shadow-md my-auto shadow-info">
          <div className="text-center px-5 pt-2 pb-1">
            <h1 className="font-black text-xl text-base-500">INSCRIPTION</h1>
            <p className="font-mono text-gray-600 text-sm">
              Remplissez la formulaire pour créer votre compte
            </p>
          </div>

          <div className="w-full flex flex-col">
            <div className="mx-5 space-y-1">
              <Input
                label="Nom"
                type="text"
                name="nom"
                placeholder="Entrer votre nom"
                icon={User}
              />
              <Input
                label="Prénom"
                type="text"
                name="prenom"
                placeholder="Entrer votre prénom"
                icon={User}
              />
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
              <Input
                label="Confirmation mot de passe"
                type={showRepass ? "password" : "text"}
                name="repassword"
                placeholder="Repeter votre mot de passe"
                icon={Lock}
                showEditIcon={true}
                togglePass={() => setShowRepass(!showRepass)}
              />
            </div>
          </div>

          <div className="card-actions justify-center px-10 block">
            <button className="btn btn-primary w-full mt-5">
              Creer un compte
            </button>
            <p className="text-center m-1">ou</p>
            <button className="btn btn-soft btn-primary w-full mb-2">
              <img src="/google.svg" alt="google ico" className="w-5" />
              Continuer avec Google
            </button>
            <div className="flex justify-center">
              <p className="mr-2 mb-3">Déjà membre ? </p>
              <NavLink
                to="/login"
                className="text-blue-500 font-bold cursor-pointer"
              >
                Connecter
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
