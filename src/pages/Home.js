import banner from "../assets/img/banner.jpeg";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://vinted-backend-app.herokuapp.com/offers?limit=1&page=${page}`
      );

      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [page]);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="category">
        <span>Femmes</span>
        <span>{"|"}</span>
        <span>Hommes</span>
        <span>{"|"}</span>
        <span>Enfants</span>
        <span>{"|"}</span>
        <span>Maison</span>
        <span>{"|"}</span>
        <span>Divertissement</span>
        <span>{"|"}</span>
        <span>Animaux</span>
        <span>{"|"}</span>
        <span>A propos</span>
        <span>{"|"}</span>
        <span>Notre plateforme</span>
      </div>
      <div className="space-bottom"></div>
      <div className="banner">
        <img src={banner} alt="bandeau" />
      </div>
      <div className="space-bottom"></div>
      <div className="space-bottom"></div>
      <div className="container-deux">
        {data.offers.map((item) => {
          return (
            <Link className="link" to={`/offer/${item._id}`} key={item._id}>
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
                        <div className="resum">
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
      <div></div>
      <div className="container-deux">
        <button onClick={() => setPage(page - 1)}>Page précédente</button>

        <button onClick={() => setPage(page + 1)}>Page suivante</button>
      </div>
      <div className="space-bottom"></div>
    </>
  );
}

export default Home;
