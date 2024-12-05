import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BluetoothComponent from "./utils/Bluetooth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/bluetooth" element={<BluetoothComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
