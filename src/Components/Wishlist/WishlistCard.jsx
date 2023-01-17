import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import API from "../../api";
import Slider from "./Slider";

export default function WishlistCard({
  handleShowDetail,
  id,
  setProductDetail,
}) {
  const [gallery, setGallery] = useState([]);
  const [product, setProduct] = useState({});

  const api = new API();

  useEffect(() => {
    api.getGallery(id).then((result) => setGallery(result));
    api.getProductDetail(id).then((result) => setProduct(result));
  }, []);

  function handleDetailClick(e) {
    api
      .getProductDetail(id)
      .then((result) => setProductDetail(result[0]));
    handleShowDetail();
  }

  return (
    <div className="order-border">
      {product.length && (
        <>
          <h2>{product[0].title}</h2>
          <div className="detail-container">
            <Slider gallery={[{ url: product[0].thumbnail }, ...gallery]} />
            <div>
              <h3>{product[0].summary.slice(0, 25)}...</h3>
              <p>{product[0].details.slice(0, 50)}...</p>
            </div>
            <div className="button-add-details">
              <Button variant="success">Add to cart</Button>
              <Button
                id={product.product_id}
                variant="outline-secondary"
                onClick={handleDetailClick}
              >
                See details
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
