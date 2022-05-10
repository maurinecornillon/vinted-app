import { useParams } from "react-router-dom";

import axios from "axios";

import { useEffect, useState } from "react";

function Offer() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-backend-app.herokuapp.com/offer/${id}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <span> En cours de chargement ... </span>
  ) : (
    <>
      <div className="offer-only">
        <div className="offer-only-left">
          <img
            className="photo"
            src={data.product_image.secure_url}
            alt=""
          ></img>
        </div>

        <div className="offer-only-right">
          <span className="price-offer">{data.product_price} €</span>
          <br />
          <br />

          <div>
            {data.product_details.map((item, index) => {
              const keys = Object.keys(item);
              return (
                <div key={index}>
                  {keys[0]} : {item[keys[0]]}
                </div>
              );
            })}

            <br />
            <div>{"---------------------------------------"}</div>
            <br />
            <h2>{data.product_name}</h2>
          </div>
          <br />
          <br />
          <button className="acheter">Acheter</button>
        </div>
      </div>
    </>
  );
}
export default Offer;
