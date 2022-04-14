import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";

const Header = ({
  setPage,
  setSearchBar,
  searchBar,
  isLogged,
  setTokens,
  setSignupModal,
  setLoginModal,
  setToPublish,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [burgerMenu, setBurgerMenu] = useState(false);

  const handlePublishBtn = () => {
    if (isLogged) {
      navigate("/publish");
    } else {
      setToPublish(true);
      setLoginModal(true);
    }
  };

  return (
    <div className="header">
      <section className="top">
        <div className="container">
          <div className="left-header">
            <Link to="/">
              <img className="header-logo" src={logo} alt="logo" />
            </Link>
            {location.pathname === "/" && (
              <div className="search-bar">
                <input
                  type="text"
                  value={searchBar}
                  placeholder="Recherche des articles"
                  onChange={(event) => {
                    setSearchBar(event.target.value);
                    setPage(1);
                  }}
                />
                <div className="icon-container">
                  <FontAwesomeIcon className="search-icon" icon="magnifying-glass" />
                </div>
              </div>
            )}
          </div>
          <div className="right-header">
            {isLogged ? (
              <button
                onClick={() => {
                  setTokens(null, null);
                  navigate("/");
                }}
                className="disconnect-btn"
              >
                Se déconnecter
              </button>
            ) : (
              <div className="loggin-signup-btn-container ">
                <button onClick={() => setSignupModal(true)}>S'inscrire</button>
                <button onClick={() => setLoginModal(true)}>Se connecter</button>
              </div>
            )}
            <button className="sale-btn" onClick={handlePublishBtn}>
              Vends tes articles
            </button>
          </div>
          <div className="menu-icon" onClick={() => setBurgerMenu(!burgerMenu)}>
            {burgerMenu ? <FontAwesomeIcon icon="xmark" /> : <FontAwesomeIcon icon="bars" />}
          </div>
        </div>
      </section>
      {burgerMenu && (
        <section className="burger-menu-open">
          <div className="container">
            <button className="sale-btn" onClick={handlePublishBtn}>
              Vends tes articles
            </button>
            {isLogged ? (
              <button
                onClick={() => {
                  setTokens(null, null);
                  navigate("/");
                }}
                className="disconnect-btn"
              >
                Se déconnecter
              </button>
            ) : (
              <div className="loggin-signup-btn-container ">
                <button onClick={() => setSignupModal(true)}>S'inscrire</button>
                <button onClick={() => setLoginModal(true)}>Se connecter</button>
              </div>
            )}
          </div>
        </section>
      )}
      {location.pathname === "/" && (
        <section className="bottom">
          <div className="container">
            <div className="search-bar">
              <input
                type="text"
                value={searchBar}
                placeholder="Recherche des articles"
                onChange={(event) => {
                  setSearchBar(event.target.value);
                  setPage(1);
                }}
              />
              <div className="icon-container">
                <FontAwesomeIcon className="search-icon" icon="magnifying-glass" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Header;
