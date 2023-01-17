import MinWishlistCard from "./MinWishlistCard";
import NoItems from "../ShoppingCart/NoItems";

export default function ProfileWishlist({
  wishlist,
  handleShow,
  handleClose,
  setProductDetail,
}) {
  return (
    <div className="wishlist-container wishlist-card-container scrollbar-hidden">
      <div className="top-wishlist">
        <h3>Wishlist</h3>
        <p>More {">"}</p>
      </div>
      {wishlist && wishlist.length ? (
        wishlist.map((product, idx) => (
          <MinWishlistCard
            key={idx}
            handleShowDetail={handleShow}
            handleClose={handleClose}
            id={product.product_id}
            setProductDetail={setProductDetail}
          />
        ))
      ) : (
        <NoItems />
      )}
    </div>
  );
}
