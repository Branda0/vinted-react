import { useLocation, Navigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ isLogged }) => {
  const location = useLocation();

  // If we have some Offer product data we can continue, otherwise Navigate to home page
  if (location.state) {
    console.log(location);
    const { data } = location.state;

    // Lereacteur api-key
    // const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");

    //own api-key
    const stripePromise = loadStripe(
      "pk_test_51KTY1ECOawDt6ac8zSW8cjOsGDt5H2UTBoq7nHnRBa2rb3bgxHWFXj6GLpJx6PLE4GV1EVsUSrAn09cI5Wuz4bbC009tgP6zJr"
    );

    const productPrice = data.product_price;
    const deliveryCost = 3.5;
    const tax = productPrice * 0.1;
    const totalPrice = (productPrice + deliveryCost + tax).toFixed(2);

    console.log("isLogged =====>", isLogged);
    console.log("data =====>", data);
    return !isLogged ? (
      <Navigate to="/" state={{ toLogin: true }} />
    ) : (
      <div className="payment-container">
        <div className="container">
          <h1>Résumé de la commande</h1>
          <div className="details">
            <div className="line">
              <span>Commande</span>
              <span>{productPrice} €</span>
            </div>

            <div className="line">
              <span>Frais de protection acheteur</span>
              <span>{tax.toFixed(2)} €</span>
            </div>

            <div className="line">
              <span>Frais de port</span>
              <span>{deliveryCost.toFixed(2)} €</span>
            </div>
          </div>
          <div className="total">
            <div>
              <span>Total</span>
              <span>{totalPrice} €</span>
            </div>
            <p>
              Il ne vous reste plus qu'une étape pour vous offrir <b>{data.product_name}</b>. Vous allez payer{" "}
              <b>{totalPrice} €</b> (frais de protection et frais de port inclus)
            </p>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={totalPrice} title={data.product_name} />
          </Elements>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Payment;
