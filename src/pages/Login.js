import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Se connecter</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={email}
            type="email"
            placeholder="Adresse email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <div className="form-input-password">
            <input
              className="input"
              type={passwordVisibility ? "text" : "password"}
              placeholder="Mot de passe"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <span onClick={() => setPasswordVisibility(!passwordVisibility)} className="eye-icon">
              <FontAwesomeIcon icon="eye" />
            </span>
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <span onClick={() => navigate("/signup")} className="bottom-link">
          Pas encore de compte ? Inscris-toi !
        </span>
      </div>
    </div>
  );
};

export default Login;
