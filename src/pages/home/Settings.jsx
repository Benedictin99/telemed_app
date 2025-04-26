import React, { useState } from "react";
import NavBar from "../../composants/NavBar";
import { UserInfos } from "../../utils";
import {
  CalendarIcon,
  Check,
  HeartPulse,
  IdCardIcon,
  Lock,
  MailIcon,
  PenBox,
  Phone,
  VenusAndMars,
} from "lucide-react";
import Input from "../../composants/Input";

const Settings = () => {
  const [readOnly, setReadOnly] = useState(true);
  const [showPass, setShowPass] = useState(true);

  const [name, setName] = useState(UserInfos.name);
  const [lastName, setLastName] = useState(UserInfos.lastName);
  const [sexe, setSexe] = useState(UserInfos.sexe);
  const [phone, setPhone] = useState(UserInfos.phone);
  const [mail, setMail] = useState(UserInfos.email);
  const [maladie, setMaladie] = useState(UserInfos.maladie);
  const [pass, setPass] = useState(UserInfos.password);

  const [naissance, setNaissance] = useState(() => {
    const [day, month, year] = UserInfos.naissance.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  });

  const handleNaissance = (e) => {
    const newDate = e.target.value;
    if (!isNaN(new Date(newDate).getTime())) {
      setNaissance(newDate);
    }
  };

  return (
    <div className="min-h-screen max-w-screen flex flex-col">
      <NavBar />

      <div className="flex-1 mt-5">
        <div className="h-full flex justify-center items-center px-4 md:px-16">
          <div className="w-full max-w-4xl bg-base-300 p-6 rounded-2xl h-auto flex flex-col">
            <div className="flex justify-between mb-5">
              <h1 className="text-2xl font-bold">INFORMATIONS</h1>

              {readOnly && (
                <PenBox
                  onClick={() => setReadOnly(!readOnly)}
                  className="cursor-pointer hover:scale-105 duration-300"
                />
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6 flex-1">
              {/* Premier section */}
              <div className="space-y-4 w-full md:w-1/2">
                <Input
                  label="Nom"
                  type="text"
                  name="nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={readOnly}
                  icon={IdCardIcon}
                />

                <Input
                  label="Prénom"
                  type="text"
                  name="prenom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  readOnly={readOnly}
                  icon={IdCardIcon}
                />

                <Input
                  label="Sexe"
                  type="text"
                  name="sexe"
                  value={sexe}
                  onChange={(e) => setSexe(e.target.value)}
                  readOnly={readOnly}
                  icon={VenusAndMars}
                />

                <Input
                  label="Adresse email"
                  type="email"
                  name="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  readOnly={readOnly}
                  icon={MailIcon}
                />

                <Input
                  label="Date de naissance"
                  type="date"
                  name="naissance"
                  value={naissance}
                  onChange={handleNaissance}
                  readOnly={readOnly}
                  icon={CalendarIcon}
                />
              </div>

              {/* Deuxième section */}
              <div className="space-y-4 w-full md:w-1/2 flex flex-col">
                <div className="flex-1 space-y-4">
                  <Input
                    label="Téléphone"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    readOnly={readOnly}
                    icon={Phone}
                  />
                  <Input
                    label="Maladie"
                    type="text"
                    name="maladie"
                    value={maladie}
                    onChange={(e) => setMaladie(e.target.value)}
                    readOnly={readOnly}
                    icon={HeartPulse}
                  />
                  <Input
                    label="Mot de passe"
                    type={showPass ? "password" : "text"}
                    name="password"
                    value={pass}
                    onChange={(e) => setPhone(e.target.value)}
                    readOnly={readOnly}
                    icon={Lock}
                    togglePass={() => setShowPass(!showPass)}
                  />
                  <Input
                    label="Confirmer le mot de passe"
                    type={showPass ? "password" : "text"}
                    name="repassword"
                    value={pass}
                    onChange={(e) => setPhone(e.target.value)}
                    readOnly={readOnly}
                    icon={Lock}
                    showEditIcon={!readOnly}
                    togglePass={() => setShowPass(!showPass)}
                  />
                </div>

                {!readOnly && (
                  <div className="mt-auto pt-6 flex justify-end">
                    <button
                      onClick={() => setReadOnly(!readOnly)}
                      className="bg-secondary px-6 py-2 rounded-full hover:bg-primary hover:scale-105 transition-all duration-300 cursor-pointer"
                    >
                      Sauvegarder
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
