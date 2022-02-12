import tear from "../assets/svg/tear.svg";

import { useEffect, useState } from "react";
import axios from "axios";

import Product from "../components/Product";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      /////////////////////////////////////
      // UTILISER SA PROPRE DB PLUS TARD //
      /////////////////////////////////////
      const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
      setData(response.data);
      setIsLoading(false);
      console.log(response);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>Page Loading</span>
  ) : (
    <div className="content-container">
      <div className="hero-container">
        <img src={tear} alt="hero-bottom-tear" className="tear" />
      </div>
      <div className="container">
        {data.offers.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
