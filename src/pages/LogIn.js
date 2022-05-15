import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-backend-app.herokuapp.com/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      console.log(response.data.token);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="signup-container">
        <h1>Se connecter</h1>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <input className="sign" type="submit" value="Connexion" />
      </form>
    </div>
  );
};

export default LogIn;
