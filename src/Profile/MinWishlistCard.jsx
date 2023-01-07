import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import API from "../api";

export default function MinWishlistCard({ handleShowDetail, id, setProductDetail }) {
  const [product, setProduct] = useState({});
  const api = new API();
  useEffect(() => {
    api.getProductDetail(id).then((result) => setProduct(result));
  }, []);

  function handleDetailClick(e) {
      setProductDetail(product[0])
      handleShowDetail();
  }

  return (
    <div className="d-flex justify-content-between align-items-center border border-dark p-2 m-2 rounded">
      {product && product.length && (
        <>
          <img src={product[0].thumbnail} alt="" className="w-25" />
          <div>
            <h4 className="fs-5">{product[0].title.slice(0, 15)}...</h4>
            <p className="fs-7">{product[0].summary.slice(0, 20)}...</p>
          </div>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <Button
              variant="outline-secondary"
              onClick={handleDetailClick}
              className="fs-7"
            >
              Details
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
