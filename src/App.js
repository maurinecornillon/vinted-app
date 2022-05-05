import "./App.css";

import Header from "./components/Header";
// Pages
import Home from "./pages/Home";
import Offer from "../src/pages/Offer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Import des icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  return (
    <Router>
      <Header />
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
      </Routes>
    </Router>
  );
}

export default App;
