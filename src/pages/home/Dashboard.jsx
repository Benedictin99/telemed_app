import React from "react";
import NavBar from "../../composants/NavBar";
import {
  GlycemieData,
  RelatedDoctors,
  TemperatureData,
  TensionData,
  UserInfos,
} from "../../utils";
import { BiChat } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import ResponsiveChart from "../../composants/ResponsiveChart";

const Dashboard = () => {
  return (
    <div className="min-h-screen max-w-screen">
      <NavBar />

      <div className="p-5 h-full w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min">
          <div className="md:col-span-1 h-[300px] md:h-[35vh] lg:h-[40vh]">
            <ResponsiveChart data={GlycemieData} />
          </div>
          <div className="md:col-span-1 h-[300px] md:h-[35vh] lg:h-[40vh]">
            <ResponsiveChart data={TensionData} />
          </div>
          <div className="md:col-span-1 h-[300px] md:h-[35vh] lg:h-[40vh]">
            <ResponsiveChart data={TemperatureData} />
          </div>
        </div>

        <div className="mt-5">
          <h1 className="p-5 font-bold text-xl">Related doctors</h1>
          <ul className="flex flex-col gap-2">
            {RelatedDoctors.map((doctors, index) => (
              <li
                key={index}
                className="bg-base-300 p-2 ml-5 flex gap-3 rounded-md items-center justify-between pr-5 hover:scale-101 duration-200"
              >
                <div className="flex items-center">
                  <doctors.img size={60} />
                  <div>
                    <h1 className="font-bold text-xl">{doctors.name}</h1>
                    <p className="text-sm font-mono">{doctors.speciality}</p>
                  </div>
                </div>
                <NavLink
                  to="/discussion"
                  className="cursor-pointer hover:bg-base-100 p-2 rounded-full"
                >
                  <BiChat />
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
