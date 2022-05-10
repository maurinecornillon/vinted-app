import logo from "../assets/img/logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Header = ({ userToken, handleToken }) => {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="container">
          <section className="header">
            <section className="left-header">
              <img src={logo} onClick={() => navigate("/")} alt="logo" />

              <div className="Recherche">
                <FontAwesomeIcon className="icone" icon="magnifying-glass" />
                <input type="text" placeholder="Rechercher..." />
              </div>
            </section>
            <section className="right-header">
              <div className="contact">
                <i className="fa-solid fa-comments"></i>
                {!userToken ? (
                  <>
                    <Link to="/signup">
                      <button>S'inscrire</button>
                    </Link>
                    <br />
                    <Link to="/login">
                      <button>Connexion</button>
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      handleToken();
                    }}
                  >
                    Déconnexion
                  </button>
                )}

                <br />
              </div>
              <button
                className="send-button"
                onClick={() => navigate("/publish")}
              >
                Vendre tes articles
              </button>
            </section>
          </section>
        </div>

        {/* <div className="space-bottom"></div> */}
      </header>
    </>
  );
};
export default Header;
