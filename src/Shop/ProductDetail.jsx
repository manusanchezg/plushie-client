import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Slider from "../Wishlist/Slider";
import API from "../api";
import Swal from "sweetalert2";

export default function ProductDetail({
  handleClose,
  show,
  productDetail,
  loginStatus,
}) {
  const [gallery, setGallery] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const api = new API();

  useEffect(() => {
    if (productDetail) {
      api
        .getGallery(productDetail[0].product_id)
        .then((result) => setGallery(result));
    }
  }, [productDetail]);

  function handleAddToCart() {
    if (quantity > 0) {
      api.addToShoppingCart(
        loginStatus.user.username,
        productDetail.product_id,
        quantity
      );
      Swal.fire({
        icon: "success",
        title: "Item added to cart!",
        text: "Check the changes in the shopping cart",
      });
      handleClose();
    } else {
      Swal.fire({
        icon: "error",
        title: "An error has occurred",
        text: "In order to add this item to the cart you need to fill in all fields",
      });
    }
  }

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="main-modal">
      <div className="portal">
        {productDetail && Object.keys(productDetail).length && (
          <>
            <div>
              <Slider
                gallery={[{ url: productDetail[0].thumbnail }, ...gallery]}
              />
            </div>
            <div>
              <Modal.Header closeButton>
                <Modal.Title>{productDetail[0].title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{productDetail[0].details}</Modal.Body>
              <Modal.Body>
                <div className="select">
                  <label htmlFor="amount">Amount: </label>
                  <select
                    name=""
                    id=""
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <option>Select...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>
                <div className="select">
                  <label htmlFor="color">Color: </label>
                  <select name="" id="">
                    <option value="">Choose...</option>
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                  </select>
                </div>
                <div className="select">
                  <label htmlFor="size">Size: </label>
                  <select name="" id="">
                    <option value="s"> S </option>
                    <option value="m"> M </option>
                    <option value="l"> L </option>
                    <option value="xl"> XL </option>
                    <option value="xxl"> XXL </option>
                  </select>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <p className="mx-5 fs-5 fw-bolder">${productDetail.price}</p>
                <Button variant="success" onClick={handleAddToCart}>
                  Add To Cart
                </Button>
              </Modal.Footer>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
