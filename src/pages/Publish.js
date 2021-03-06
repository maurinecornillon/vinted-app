import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = () => {
  const navigate = useNavigate();

  const [publishment, setPublishment] = useState(false);

  const [pictures, setPictures] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPublishment(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", pictures);

    try {
      const response = await axios.post(
        "https://vinted-backend-app.herokuapp.com/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("userToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(Cookies.get("userToken"));

      setData(response.data);
      setPublishment(false);
      console.log(setPublishment);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return Cookies.get("userToken") ? (
    <>
      <div className="background">
        <div className="">
          <div className="publish-container">
            <h2>Vends ton article</h2>

            <form className="publish-form" onSubmit={handleSubmit}>
              <div className="bloc-un">
                <div className="picture-bloc">
                  <label className="picture-btn" htmlFor="add-picture-input">
                    <span> Ajoute une photo </span>
                    <span> + </span>
                  </label>
                  <input
                    id="add-picture-input"
                    className="add-picture-input"
                    type="file"
                    onChange={(event) => {
                      setPictures(event.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <br />
              <br />

              <div className="bloc-deux">
                <div className="left">
                  <span>Titre</span>
                  <br />
                  <br />
                  <span>Description</span>
                </div>
                <div className="right">
                  <input
                    type="text"
                    placeholder="ex: Pull manche longue"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                  <br />
                  <br />

                  <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </div>
              </div>

              <br />
              <br />
              <div className="bloc-trois">
                <div className="left">
                  <span>Marque</span>
                  <br />
                  <br />
                  <span>Taille</span>
                  <br />
                  <br />
                  <span>Couleur</span>
                  <br />
                  <br />
                  <span>Etat</span>
                  <br />
                  <br />
                  <span>Lieu</span>
                </div>
                <div className="right">
                  <input
                    type="text"
                    placeholder="ex: Nike"
                    value={brand}
                    onChange={(event) => {
                      setBrand(event.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <input
                    type="text"
                    placeholder="ex: M / 38 / 10"
                    value={size}
                    onChange={(event) => {
                      setSize(event.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <input
                    type="text"
                    value={color}
                    placeholder="ex: Blanc et noir"
                    onChange={(event) => {
                      setColor(event.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <input
                    type="text"
                    placeholder="ex: Neuf avec ??tiquette"
                    value={condition}
                    onChange={(event) => {
                      setCondition(event.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <input
                    type="text"
                    value={city}
                    placeholder="ex: Paris"
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <br />
              <div className="bloc-quatre">
                <div className="left">
                  <span>Prix</span>
                </div>
                <div className="right">
                  <input
                    className="price_input"
                    type="price"
                    value={price}
                    placeholder="0,00 ???"
                    onChange={(event) => {
                      setPrice(event.target.value);
                    }}
                  />
                </div>
              </div>
              {publishment === false && <div className="publishment"></div>}
              {publishment === true ? (
                <div className="publishment">En cours de publication</div>
              ) : (
                data && navigate(`/offer/${data._id}`)
              )}
              <br />
              <div className="submit-form">
                <button className="add" type="submit">
                  Ajouter
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
