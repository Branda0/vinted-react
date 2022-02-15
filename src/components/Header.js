import logo from "../assets/img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, Link } from "react-router-dom";

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
      <div className="container">
        <div className="left-header">
          <Link to="/">
            <img className="header-logo" src={logo} alt="logo" />
          </Link>
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
      </div>
    </div>
  );
};

export default Header;
