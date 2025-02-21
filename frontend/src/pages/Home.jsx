// src/pages/Home.jsx
import React from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col max-h-screen">
      <main className="flex-grow">
        <Hero bgImage="/hero.svg" />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
