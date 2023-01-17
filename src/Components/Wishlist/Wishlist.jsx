import { Modal } from "react-bootstrap";
import React from "react";
import WishlistCard from "./WishlistCard";
import heart from "../../assets/wishlist.svg";

export default function Wishlist({
  handleClose,
  show,
  handleShowDetail,
  setProductDetail,
  wishlist,
}) {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="main-modal">
      <div className="orders scrollbar-hidden height">
        <div className="sticky">
          <Modal.Header closeButton>
            <Modal.Title>Your wishlist</Modal.Title>
          </Modal.Header>
        </div>
        {wishlist && wishlist.length ? (
          wishlist.map((product, idx) => (
            <WishlistCard
              key={idx}
              handleShowDetail={handleShowDetail}
              handleClose={handleClose}
              id={product.product_id}
              setProductDetail={setProductDetail}
            />
          ))
        ) : (
          <div className="text-center w-100 d-flex justify-content-center align-items-center h-100 scrollbar-hidden">
            <figure>
              <img src={heart} alt="" />
              <figcaption className="mt-4">
                You haven't saved anything yet
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </Modal>
  );
}
