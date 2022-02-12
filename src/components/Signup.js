import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = ({ setToken, setSignupModal, setLoginModal }) => {
  const [name, setName] = useState("jean");
  const [email, setEmail] = useState("jean@gmail.com");
  const [password, setPassword] = useState("jean");
  const [newsletter, setNewsletter] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/signup", {
        email: email,
        username: name,
        password: password,
        newsletter: newsletter,
      });
      setToken(response.data.token);
      setSignupModal(false);
      // setSignupError("");
    } catch (error) {
      if (error.response.status === 400) {
        setSignupError("Paramètres manquants");
      } else if (error.response.status === 409) {
        setSignupError("Cet email a déjà un compte !");
      }
    }
  };

  return (
    <div className="modal-container">
      <div className="signup-modal">
        <FontAwesomeIcon icon="xmark" className="close-modal" onClick={() => setSignupModal(false)} />
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
              value={password}
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
                setNewsletter(event.target.checked);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>

          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de
            Confidentialité de Vinted. Je confirme avoir au moins 18 ans.
          </p>
          {signupError && <span className="error-msg">{signupError}</span>}
          <button type="submit">S'inscrire</button>
        </form>
        <span
          className="bottom-link"
          onClick={() => {
            setSignupModal(false);
            setLoginModal(true);
          }}
        >
          Tu as déjà un compte ? Connecte-toi !
        </span>
      </div>
    </div>
  );
};

export default Signup;
