import React from "react";
import NavBar from "../../composants/NavBar";
import { UserInfos } from "../../utils";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

const Profile = () => {
  return (
    <div className="min-h-screen max-w-screen">
      <NavBar />

      <div className="flex my-auto justify-center p-5">
        <div className="bg-neutral w-[30%] rounded-l-xl text-center py-15">
          <img
            src={UserInfos.img}
            alt="profil"
            className="w-55 mx-auto mb-10"
          />
          <p className="text-2xl font-bold mb-5">
            {UserInfos.name} {UserInfos.lastName}
          </p>
          <NavLink to="/settings">
            <BiEdit className="mx-auto text-3xl" />
          </NavLink>
        </div>

        <div className="bg-secondary-content w-[60%] rounded-r-xl px-3 pt-3 flex flex-col gap-5">
          <div>
            <h1 className="text-xl font-semibold">Informations</h1>
            <hr className="border-none outline-none bg-primary h-0.5 w-3/5" />

            <div className="my-5 w-full">
              <div className="flex flex-col md:flex-row justify-around">
                <div className="ml-5 md:w-[50%]">
                  <p>Nom</p>
                  <p className="p-2 text-gray-500">{UserInfos.name}</p>
                </div>

                <div className="ml-5 md:w-[50%]">
                  <p>Prénom</p>
                  <p className="p-2 text-gray-500">{UserInfos.lastName}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-around">
                <div className="ml-5 md:w-[50%]">
                  <p>Sexe</p>
                  <p className="p-2 text-gray-500">{UserInfos.sexe}</p>
                </div>

                <div className="ml-5 md:w-[50%]">
                  <p>Date de naissance</p>
                  <p className="p-2 text-gray-500">{UserInfos.naissance}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-semibold">Coordonnées</h1>
            <hr className="border-none outline-none bg-primary h-0.5 w-3/5" />

            <div className="my-5 w-full">
              <div className="flex flex-col md:flex-row">
                <div className="ml-5 md:w-[50%]">
                  <p>Téléphone</p>
                  <p className="p-2 text-gray-500">{UserInfos.phone}</p>
                </div>

                <div className="ml-5 md:w-[50%]">
                  <p>Adresse email</p>
                  <p className="p-2 text-gray-500">{UserInfos.email}</p>
                </div>
              </div>

              <div className="flex mx-auto items-center justify-center gap-5 md:gap-15 mt-3">
                <img src="/google.svg" alt="ico" className="w-5 md:w-10" />
                <img src="/message.svg" alt="ico" className="w-5 md:w-10" />
                <img src="whatsapp-ico.svg" alt="ico" className="w-5 md:w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
