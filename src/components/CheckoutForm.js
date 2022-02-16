import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ amount, title }) => {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const userId = Cookies.get("userId");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      setIsSending(true);
      const cardElements = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElements, {
        name: userId,
      });

      const response = await axios.post("https://brandao-vinted.herokuapp.com/payment", {
        token: stripeResponse.token.id,
        title: title,
        amount: amount,
      });

      //   const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
      //     token: stripeResponse.token.id,
      //     title: title,
      //     amount: amount,
      //   });

      if (response.data.status === "succeeded") {
        setPaymentSuccess(true);
        setIsSending(false);
      }

      console.log(response);
    } catch (error) {
      setIsSending(false);
      console.log(error.message);
    }
  };

  return (
    <div className="checkoutForm">
      {paymentSuccess ? (
        <div className="payment-success">
          <span>Paiement effectué, Merci</span>
          <button
            onClick={() => {
              navigate("/");
              setPaymentSuccess(false);
            }}
          >
            Retour à l'acceuil
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          {isSending ? (
            <button type="submit">
              <FontAwesomeIcon icon="spinner" className="spinner-icon" />
            </button>
          ) : (
            <button type="submit">Passer la commande</button>
          )}
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
