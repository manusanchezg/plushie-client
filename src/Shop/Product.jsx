import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import API from "../api";

export default function Product({
  handleShow,
  size = "18rem",
  setProductDetail,
  title,
  summary,
  price,
  thumbnail,
  id,
  loginStatus,
  wishlist,
  setWishlist,
}) {
  const api = new API();

  useEffect(() => {
    if (wishlist && wishlist.length) {
      wishlist.forEach((product) => {
        if (product.product_id === id) {
          const image = document.getElementById(`favourite-${id}`);
          image.classList.add("favourite");
        }
      });
    }
  }, [wishlist, id]);

  function changeBackgroundImage(e) {
    const id = e.target.id.split("-")[1];
    const product = { customer_id: loginStatus.user.username, product_id: id };
    let newWishlist;
    e.target.classList.toggle("favourite");
    if (e.target.classList.contains("favourite")) {
      newWishlist = [...wishlist, product];
      api.addToWishlist(loginStatus.user.username, id);
    } else {
      newWishlist = wishlist.filter((item) => item.product_id !== id);
      api.deleteFromWishlist(loginStatus.user.username, id);
    }
    setWishlist(newWishlist);
  }

  function handleShowDetail(e) {
    api
      .getProductDetail(e.target.id)
      .then((result) => setProductDetail(result));
    handleShow();
  }

  return (
    <Card style={{ width: size }} className="product">
      <Card.Img variant="top" src={thumbnail} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{summary}</Card.Text>
        <div className="button-container">
          <Button variant="primary" onClick={handleShowDetail} id={id}>
            Details
          </Button>
          <div
            className="favourite-icon"
            id={`favourite-${id}`}
            onClick={changeBackgroundImage}
          ></div>{" "}
          <span>${price}</span>
        </div>
      </Card.Body>
    </Card>
  );
}
