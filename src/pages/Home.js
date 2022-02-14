import tear from "../assets/svg/tear.svg";

import { useEffect, useState } from "react";
import axios from "axios";

import Product from "../components/Product";
import Filter from "../components/Filter";

const Home = ({ searchBar, page, setPage, sort, setSort, limit, setLimit, prices, setPrices }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      /////////////////////////////////////
      // UTILISER SA PROPRE DB PLUS TARD //
      /////////////////////////////////////

      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchBar}&priceMin=${prices[0]}&priceMax=${prices[1]}&sort=${sort}&page=${page}&limit=${limit}`
      );
      // const response = await axios.get(
      //   `https://brandao-vinted.herokuapp.com/offers?title=${searchBar}&priceMin=${prices[0]}&priceMax=${prices[1]}&sort=${sort}&page=${page}&limit=${limit}`
      // );

      setData(response.data);
      setIsLoading(false);
      console.log(response);
    };

    fetchData();
    console.log("requete axios");
  }, [page, sort, limit, prices, searchBar]);

  return isLoading ? (
    <span>Page Loading</span>
  ) : (
    <div className="content-container">
      <div className="hero-container">
        <img src={tear} alt="hero-bottom-tear" className="tear" />
      </div>
      <Filter
        count={data.count}
        page={page}
        setPage={setPage}
        sort={sort}
        setSort={setSort}
        limit={limit}
        setLimit={setLimit}
        prices={prices}
        setPrices={setPrices}
      />
      <div className="products-container">
        <div className="container">
          {data.offers.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
