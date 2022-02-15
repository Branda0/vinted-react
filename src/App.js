import "./App.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEye,
  faXmark,
  faMagnifyingGlass,
  faCaretUp,
  faCaretDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Cookies from "js-cookie";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import NotFound from "./pages/NotFound";

//Components
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PublishValidate from "./components/PublishValidate";

library.add(faEye, faXmark, faMagnifyingGlass, faCaretUp, faCaretDown, faPlus);

function App() {
  const [isLogged, setIsLogged] = useState(Cookies.get("userToken") || false);
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [publishValidateModal, setPublishValidateModal] = useState(false);
  const [toPublish, setToPublish] = useState(false);

  const storedPage = Number(localStorage.getItem("page"));
  const storedSearchBar = String(localStorage.getItem("searchBar"));
  const storedSort = String(localStorage.getItem("sort"));
  const storedLimit = Number(localStorage.getItem("limit"));
  const storedPriceMin = Number(localStorage.getItem("priceMin"));
  const storedPriceMax = Number(localStorage.getItem("priceMax"));

  const [page, setPage] = useState(storedPage || 1);
  const [searchBar, setSearchBar] = useState(storedSearchBar || "");
  const [sort, setSort] = useState(storedSort || "");
  const [limit, setLimit] = useState(storedLimit || 16);
  const [prices, setPrices] = useState([storedPriceMin || 0, storedPriceMax || 100]);

  useEffect(() => {
    localStorage.setItem("page", Number(page));
    localStorage.setItem("searchBar", String(searchBar));
    localStorage.setItem("sort", String(sort));
    localStorage.setItem("limit", Number(limit));
    localStorage.setItem("priceMin", Number(prices[0]));
    localStorage.setItem("priceMax", Number(prices[1]));
  }, [searchBar, page, sort, limit, prices]);

  const setToken = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setIsLogged(true);
    } else {
      Cookies.remove("userToken");
      setIsLogged(false);
    }
  };

  return (
    <Router>
      <div className={`app-container ${(loginModal || signupModal) && "modal-no-scroll"}`}>
        <Header
          setPage={setPage}
          searchBar={searchBar}
          setSearchBar={setSearchBar}
          isLogged={isLogged}
          setToken={setToken}
          setSignupModal={setSignupModal}
          setLoginModal={setLoginModal}
          setToPublish={setToPublish}
        />
        {loginModal && (
          <Login
            setToken={setToken}
            setLoginModal={setLoginModal}
            setSignupModal={setSignupModal}
            toPublish={toPublish}
            setToPublish={setToPublish}
          />
        )}
        {signupModal && (
          <Signup setToken={setToken} setLoginModal={setLoginModal} setSignupModal={setSignupModal} />
        )}
        {publishValidateModal && (
          <PublishValidate
            setPublisValidatehModal={setPublishValidateModal}
            publishValidateModal={publishValidateModal}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                searchBar={searchBar}
                page={page}
                setPage={setPage}
                sort={sort}
                setSort={setSort}
                limit={limit}
                setLimit={setLimit}
                prices={prices}
                setPrices={setPrices}
                setLoginModal={setLoginModal}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/publish"
            element={
              <Publish
                setPublishValidateModal={setPublishValidateModal}
                publishValidateModal={publishValidateModal}
                setLoginModal={setLoginModal}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
