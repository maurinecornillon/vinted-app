import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

// components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Offer from "../src/pages/Offer";
import SignUp from "../src/pages/SignUp";
import LogIn from "../src/pages/LogIn";
import Publish from "../src/pages/Publish";
import Payment from "./pages/Payment";

//Import des icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);

  const handleToken = (token) => {
    if (token) {
      console.log("Création d'un cookie");
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      console.log("Suppression d'un cookie");
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header handleToken={handleToken} userToken={userToken} />

      <br />
      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<LogIn handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/payment" element={<Payment userToken={userToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
