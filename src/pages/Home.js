import "./Home.css";

import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
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
    <div>
      <Hero />
      <div className="products-container">
        {data.offers.map((product) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
