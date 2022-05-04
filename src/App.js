import "./App.css";

import Header from "./components/Header";
// Pages
import Home from "./pages/Home";
// import Offer from "./pages/Offer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

//Import des icones
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  return (
    <Router>
      <Header />
      <nav>
        <ul>
          <il>
            <Link to="/home"> Home</Link>
          </il>
        </ul>
      </nav>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
