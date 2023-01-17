import { Button, Modal } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import firePopUp from "../../Hooks/firePopUp";
import Slider from "../Wishlist/Slider";
import API from "../../api";
import Stock from "../Shop/Stock";
import Color from "../Shop/Color";
import Size from "../Shop/Size";
import Loader from "../Loader/Loader";

export default function ProductDetail({
  show,
  productDetail,
  loginStatus,
  setShowDetail,
  setProductDetail,
}) {
  const [gallery, setGallery] = useState([]);
  const [variations, setVariations] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [currSize, setCurrSize] = useState("");
  const [currColor, setCurrColor] = useState("");
  const [currStock, setCurrStock] = useState(0);

  const api = new API();

  const handleCloseDetail = useCallback(() => {
    setShowDetail(false);
    setQuantity(0);
    setCurrColor("");
    setCurrSize("");
    setCurrStock(0);
    setProductDetail({});
  }, []);

  useEffect(() => {
    if (productDetail) {
      api
        .getGallery(productDetail[0].product_id)
        .then((result) => setGallery(result));
    }
  }, [productDetail]);

  useEffect(() => {
    api
      .getVariations(productDetail[0].product_id)
      .then((result) => setVariations(result));
  }, [productDetail]);

  const handleAddToCart = useCallback(() => {
    if (quantity > 0) {
      api.addToShoppingCart(
        loginStatus.user.username,
        productDetail[0].product_id,
        quantity,
        currColor,
        currSize
      );
      firePopUp(
        "success",
        "Item added to cart!",
        "Check the changes in the shopping cart"
      );
      handleCloseDetail();
    } else
      firePopUp(
        "error",
        "An error has occurred",
        "In order to add this item to the cart you need to fill in all fields"
      );
  }, [loginStatus, productDetail, quantity, currColor, currSize]);

  return (
    <Modal show={show} onHide={handleCloseDetail} dialogClassName="main-modal">
      <div className="portal">
        {productDetail && Object.keys(productDetail).length ? (
          <>
              <Slider
                gallery={[{ url: productDetail[0].thumbnail }, ...gallery]}
              />
            <div>
              <Modal.Header closeButton>
                <Modal.Title>{productDetail[0].title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{productDetail[0].details}</Modal.Body>
              <Modal.Body>
                <Stock
                  setQuantity={setQuantity}
                  quantity={quantity}
                  variations={variations}
                  currStock={currStock}
                  setCurrStock={setCurrStock}
                  currColor={currColor}
                  currSize={currSize}
                  id={productDetail[0].product_id}
                />
                <Color variations={variations} setCurrColor={setCurrColor} />
                <Size setCurrSize={setCurrSize} />
              </Modal.Body>
              <Modal.Footer>
                <p className="mx-5 fs-5 fw-bolder">${productDetail.price}</p>
                <Button variant="success" onClick={handleAddToCart}>
                  Add To Cart
                </Button>
              </Modal.Footer>
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </Modal>
  );
}
