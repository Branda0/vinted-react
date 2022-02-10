import logo from "../assets/img/logo.png";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="header">
      <div>
        <img className="header-logo" src={logo} alt="logo" />
      </div>
      <div className="btn-container">
        <button onClick={handleSignup} className="signup-btn">
          S'inscrire
        </button>
        <button onClick={handleLogin} className="login-btn">
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default Header;
