import "./App.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./components/Signup";
import Login from "./components/Login";

library.add(faEye, faXmark, faMagnifyingGlass);

function App() {
  const [isLogged, setIsLogged] = useState(Cookies.get("userToken") || false);
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const setToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setIsLogged(true);
    } else {
      Cookies.remove("userToken");
      setIsLogged(false);
    }
    // setIsLogged(token);
  };

  return (
    <Router>
      <div className={`app-container ${(loginModal || signupModal) && "modal-no-scroll"}`}>
        <Header
          isLogged={isLogged}
          setToken={setToken}
          setSignupModal={setSignupModal}
          setLoginModal={setLoginModal}
        />
        {loginModal && (
          <Login setToken={setToken} setLoginModal={setLoginModal} setSignupModal={setSignupModal} />
        )}
        {signupModal && (
          <Signup setToken={setToken} setLoginModal={setLoginModal} setSignupModal={setSignupModal} />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
