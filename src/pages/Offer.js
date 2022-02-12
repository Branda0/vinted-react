import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      /////////////////////////////////////
      // UTILISER SA PROPRE DB PLUS TARD //
      /////////////////////////////////////
      const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`);
      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <span>Page Loading</span>
  ) : (
    <div className="offer-container">
      <div className="container">
        <div className="imgs-container" style={{ backgroundImage: `url(${data.product_image.secure_url})` }}>
          <img src="" alt="" />
        </div>
        <div className="infos-container">
          <span className="price">{data.product_price} €</span>
          <div className="infos">
            {data.product_details.map((elem) => {
              return (
                <div>
                  <span className="type">{Object.keys(elem)[0]}</span>
                  <span className="value">{Object.values(elem)[0]}</span>
                </div>
              );
            })}
          </div>
          <span className="product-name">{data.product_name}</span>
          <span className="product-description">{data.product_description}</span>
          <div className="user">
            <img className="user-photo" alt="user" src={data.owner.account.avatar.secure_url} />
            <span className="user-name">{data.owner.account.username}</span>
          </div>
          <button className="acheter-btn">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
