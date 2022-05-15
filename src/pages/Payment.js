import { Navigate, useLocation } from "react-router-dom";

//import stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//components
import CheckoutForm from "../components/CheckOutForms";

export default function Payment({ userToken }) {
  const location = useLocation();

  const { title, price } = location.state;

  const protectionPrice = price * 0.1;
  const shippingPrice = price * 0.2;
  const totalPrice = price + protectionPrice + shippingPrice;

  const stripePromise = loadStripe(
    "pk_test_51KxqpkGhJqwo1Qe2NbREK9q1GlN3NwM3CLFE6d7srimr5aqRTNF8jbKusyADu9kCSH9siOK2SqkiRIYmlo9Mx1DG00aLjMsvJK"
  );
  return (
    <div className="container-payment">
      {userToken ? (
        <div>
          <div className="payment-resume">
            <div className="payment-title">Résumé de la commande</div>
            <div className="payment-list">
              <ul>
                <li>
                  <span>Commande</span>

                  <span>{price.toFixed(2)} €</span>
                </li>
                <li>
                  <span>Frais protection acheteurs</span>
                  <span>{protectionPrice.toFixed(2)} €</span>
                </li>
                <li>
                  <span>Frais de port</span>
                  <span>{shippingPrice.toFixed(2)} €</span>
                </li>
              </ul>
            </div>

            <div className="payment-total">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)} €</span>
            </div>
            <div className="payment-text">
              Vous allez payer
              <span>{totalPrice.toFixed(2)}</span>€ (frais de protection et
              frais de port inclus) pour le <span>{title}</span>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm title={title} price={price} />
          </Elements>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}
