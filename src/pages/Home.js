import axios from "axios";

import { useEffect, useState } from "react";

function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      console.log(response.data);
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

                <div>{item.product_price} euros</div>
                {/* <div>{item.product_details} </div>
                <div>{item.product_details} </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
