import Row from "react-bootstrap/Row";
import Product from "./Product";

export default function ProductRow({
  handleShow,
  products,
  setProductDetail,
  loginStatus,
  wishlist,
  setWishlist,
}) {
  return (
    <Row className="justify-content-md-center products-container horizontal-scrollable mb-5">
      {products &&
        products.length &&
        products.map((product) => (
          <Product
            key={product.product_id}
            handleShow={handleShow}
            size={"18rem"}
            setProductDetail={setProductDetail}
            title={product.title}
            summary={product.summary}
            price={product.price}
            thumbnail={product.thumbnail}
            id={product.product_id}
            loginStatus={loginStatus}
            wishlist = {wishlist}
            setWishlist={setWishlist}
          />
        ))}
    </Row>
  );
}
