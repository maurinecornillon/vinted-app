import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
            Authorization: "Bearer " + Cookies.get("userToken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(Cookies.get("userToken"));
      setData(response.data);
      setPublishment(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container-deux">
        <div className="publish-container">
          <h2>Vends ton article</h2>
          <form className="publish_form" onSubmit={handleSendOffer}>
            <input
              className="add_picture_input"
              type="file"
              onChange={(event) => {
                setPictures(event.target.files[0]);
              }}
            />
            <input
              type="text"
              placeholder="ex: Pull manche longue"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <textarea
              name="description"
              id="description"
              rows="5"
              placeholder="ex: En bon état"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            ></textarea>
            <input
              type="text"
              placeholder="ex: Nike"
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="ex: L / 40 / 12"
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="ex: Blanc et noir"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="ex: Neuf avec étiquette"
              onChange={(event) => {
                setCondition(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="ex: Paris"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <input
              className="price_input"
              type="price"
              placeholder="0,00 €"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
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
    </>
  );
};

export default Publish;
