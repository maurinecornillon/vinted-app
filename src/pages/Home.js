import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="container-deux">
        {data.offers.map((item) => {
          return (
            <Link to={`/offer/${item._id}`} key={item._id}>
              <div>
                <div className="offers">
                  <div className="owner">{item.owner.account.username} </div>
                  {item.product_image.secure_url && (
                    <img
                      className="item"
                      src={item.product_image.secure_url}
                      alt="item"
                    />
                  )}

                  <div className="item-details">
                    <p className="price">{item.product_price} euros</p>
                    {item.product_details.map((details) => {
                      return (
                        <div>
                          <p>{details.TAILLE}</p>
                          <p>{details.MARQUE}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Home;
