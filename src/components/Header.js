import logo from "../assets/img/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLogged, setToken, setSignupModal, setLoginModal }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoginModal(true);
  };

  const handleSignup = () => {
    setSignupModal(true);
  };

  const handleDisconect = () => {
    setToken(null);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="left-header">
          <img className="header-logo" src={logo} alt="logo" />
          <div className="search-bar">
            <input type="text" placeholder="Recherche des articles" />
            <div className="icon-container">
              <FontAwesomeIcon className="search-icon" icon="magnifying-glass" />
            </div>
          </div>
        </div>
        <div className="right-header">
          {isLogged ? (
            <button onClick={handleDisconect} className="disconnect-btn">
              Se déconnecter
            </button>
          ) : (
            <div className="loggin-signup-btn-container ">
              <button onClick={handleSignup}>S'inscrire</button>
              <button onClick={handleLogin}>Se connecter</button>
            </div>
          )}
          <button className="sale-btn">Vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
