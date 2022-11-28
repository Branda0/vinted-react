import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Offer = ({ setLoginModal, isLogged, setToPayment }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const navigate = useNavigate();
  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Own back
        const response = await axios.get(`https://branda0-vinted.up.railway.app/offer/${id}`);

        // LeReacteur back
        // const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`);

        setData(response.data);
      } catch (error) {
        navigate("/NotFound");
      }
      setIsLoading(false);
    };

    fetchData();
    return () => {};
  }, [id, navigate]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="offer-container">
      <div className="container">
        <img className="product-img" src={data.product_image.secure_url} alt="product" />
        <div className="infos-container">
          <section>
            <div className="top">
              <span className="price">{data.product_price} €</span>
              <div className="infos">
                {data.product_details.map((elem, index) => {
                  return (
                    <div key={index}>
                      <span className="type">{Object.keys(elem)[0]}</span>
                      <span className="value">{Object.values(elem)[0]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <span className="product-name">{data.product_name}</span>
              <p className="product-description">{data.product_description}</p>
              <div className="user">
                <img className="user-photo" alt="user" src={data.owner.account.avatar?.secure_url} />
                <span className="user-name">{data.owner.account.username}</span>
              </div>
            </div>
          </section>

          <button
            className="buy-btn"
            onClick={() => {
              if (isLogged) {
                navigate("/payment", { state: { data } });
              } else {
                // setToPayment(true);
                setLoginModal(true);
              }
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
