import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({
  setTokens,
  setLoginModal,
  setSignupModal,
  toPublish,
  setToPublish,
  toPayment,
  setToPayment,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/login", {
      //   email: email,
      //   password: password,
      // });

      const response = await axios.post("https://brandao-vinted.herokuapp.com/user/login", {
        email: email,
        password: password,
      });

      // const response = await axios.post("http://localhost:4000/user/login", {
      //   email: email,
      //   password: password,
      // });

      setTokens(response.data.token, response.data._id);
      setLoginModal(false);
      if (toPublish) {
        navigate("/publish");
        setToPublish(false);
      } else if (toPayment) {
        //BESOIN DE FAIRE UN LIEN AVEC LES DONNEES DE L'ITEM A ACHETER POUR L'ENVOIE DE STATE DANS NAVIGATE
        // navigate("/payment");
        // setToPayment(false);
      }
    } catch (error) {
      console.log({ error });
      if (error.response.status === 400 || error.response.status === 401) {
        setLoginError("Identifiants incorrects");
      }
    }
  };

  return (
    <div className="login-modal">
      <FontAwesomeIcon
        icon="xmark"
        className="close-modal"
        onClick={() => {
          setLoginModal(false);
          setToPublish(false);
        }}
      />
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
        {loginError && <span className="error-msg">{loginError}</span>}
        <button type="submit">Se connecter</button>
      </form>
      <span
        className="bottom-link"
        onClick={() => {
          setLoginModal(false);
          setSignupModal(true);
        }}
      >
        Pas encore de compte ? Inscris-toi !
      </span>
    </div>
  );
};

export default Login;
