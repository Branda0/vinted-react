import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="signup-container">
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            value={email}
            type="email"
            placeholder="Email"
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
          <div className="form-newsletter">
            <input
              value={newsletter}
              type="checkbox"
              onChange={(event) => {
                setNewsletter(!newsletter);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>

          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de
            Confidentialité de Vinted. Je confirme avoir au moins 18 ans.
          </p>

          <button type="submit">S'inscrire</button>
        </form>
        <span onClick={() => navigate("/login")} className="bottom-link">
          Tu as déjà un compte ? Connecte-toi !
        </span>
      </div>
    </div>
  );
};

export default Signup;
