import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Hero from "../components/Hero";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const id = "34Y82YI3Y2IU3YIU23Y4";

  useEffect(() => {
    const fetchData = async () => {
      /////////////////////////////////////
      // UTILISER SA PROPRE DB PLUS TARD //
      /////////////////////////////////////
      const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>Page Loading</span>
  ) : (
    <div>
      <Header />
      <Hero />
      <span>HELLO</span>
      <Link to={`/offer/${id}`}>LINK</Link>
    </div>
  );
};

export default Home;
