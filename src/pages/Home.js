import tear from "../assets/svg/tear.svg";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import Product from "../components/Product";
import Filter from "../components/Filter";
import PageSelector from "../components/PageSelector";
import Loader from "../components/Loader";

const Home = ({
  setLoginModal,
  searchBar,
  page,
  setPage,
  sort,
  setSort,
  limit,
  setLimit,
  prices,
  setPrices,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  //Provenance de la route /publish si non authentifié => Navigate avec un location state à true
  //affichage de la modal login et remise à false du state location
  if (location.state) {
    const { toLogin } = location.state;
    setLoginModal(toLogin);
    navigate(location.state, { replace: false });
  }

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      //Own BACK
      const response = await axios.get(
        `https://brandao-vinted.herokuapp.com/offers?title=${searchBar}&priceMin=${prices[0]}&priceMax=${prices[1]}&sort=${sort}&page=${page}&limit=${limit}`
      );
      //Le Reacteur DB BACK
      // const response = await axios.get(
      //   `https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchBar}&priceMin=${prices[0]}&priceMax=${prices[1]}&sort=${sort}&page=${page}&limit=${limit}`
      // );

      setData(response.data);
      setIsLoading(false);
      console.log(response);
    };

    fetchData();
    console.log("requete axios");
  }, [page, sort, limit, prices, searchBar]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="content-container">
      <div className="hero-container">
        <img src={tear} alt="hero-bottom-tear" className="tear" />
      </div>
      <div className="filter-and-page-selector">
        <div className="container">
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
          <PageSelector count={data.count} page={page} limit={limit} setPage={setPage} />
        </div>
      </div>

      <div className="products-container">
        <div className="container">
          {data.offers.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </div>
      </div>
      <PageSelector count={data.count} page={page} limit={limit} setPage={setPage} />
    </div>
  );
};

export default Home;
