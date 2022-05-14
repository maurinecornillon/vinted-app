import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckOutForms = ({ price, title }) => {
  const elements = useElements();
  const stripe = useStripe();
  const [confirmMessage, setConfirmMessage] = useState("");

  const handlePayment = async (event) => {
    try {
      event.preventDefault();
      //Récupérer les données bancaires
      const cardInfos = elements.getElement(CardElement);
      //envoyer ces données à l'api Stripe
      const stripeResponse = await stripe.createToken(cardInfos);

      //Récupérer un stripToken
      //Envoyer ce stripeTOken à l'api Vinted
      const response = await axios.post(
        "https://vinted-backend-app.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          amount: price,
          title: title,
        }
      );

      if (response.data.status === "succeeded") {
        setConfirmMessage("Paiement validé !");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <input type="submit" />
      <span style={{ color: "green" }}>{confirmMessage}</span>
    </form>
  );
};

export default CheckOutForms;
