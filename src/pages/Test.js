import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Publish() {
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

  const handleSendOffer = async (event) => {
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
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("TokenCookie"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      setPublishment(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  return (
    <div className="publish">
      <div className="publish_container">
        <h2>Vends ton article</h2>
        <form className="publish_form" onSubmit={handleSendOffer}>
          <div className="picture_import">
            <div className="pictures_preview">
              <label className="add_picture_btn" htmlFor="add_picture_input">
                <span> Ajoute une photo</span>
              </label>
              <input
                className="add_picture_input"
                type="file"
                onChange={(event) => {
                  setPictures(event.target.files[0]);
                }}
              />
            </div>
          </div>
          <div className="text_input_selection">
            <div className="text_input">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex: Pull manche longue"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text_input">
              <h4> Décris ton article</h4>
              <textarea
                name="description"
                id="description"
                rows="5"
                placeholder="ex: En bon état"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="text_input_selection">
            <div className="text_input">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex: Nike"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="text_input">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="text_input">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex: Blanc et noir"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="text_input">
              <h4>État</h4>
              <input
                type="text"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="text_input">
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex: Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="text_input_selection">
            <div className="text_input">
              <h4>Prix</h4>
              <div className="checkbox_and_price">
                <input
                  className="price_input"
                  type="price"
                  placeholder="0,00 €"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="checkbox_interest">
                  {exchangeInterest ? (
                    <label
                      className="checkbox_interest_label_checked"
                      htmlFor="checkbox_exchange_interest"
                    ></label>
                  ) : (
                    <label
                      className="checkbox_interest_label"
                      htmlFor="checkbox_exchange_interest"
                    ></label>
                  )}
                </div>
              </div>
            </div>
          </div>
          {publishment === false && <div className="publishment"></div>}
          {publishment === true ? (
            <div className="publishment">En cours de publication</div>
          ) : (
            data && navigate(`/offer/${data._id}`)
          )}
          <div className="submit_form_btn">
            <button type="submit"> Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
}
