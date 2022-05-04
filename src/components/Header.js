import logo from "../assets/img/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <section className="header">
            <section className="left-header">
              <img src={logo} alt="logo" />

              <div className="Recherche">
                <FontAwesomeIcon className="icone" icon="magnifying-glass" />
                <input type="text" placeholder="Rechercher..." />
              </div>
            </section>
            <section className="right-header">
              <div className="contact">
                <i className="fa-solid fa-comments"></i>

                <button>S'inscrire</button>

                <button>Connectez-vous</button>
              </div>
              <button className="send-button">Vendre tes articles</button>
            </section>
          </section>
        </div>
        <div className="space-bottom"></div>
      </header>
    </>
  );
};
export default Header;
