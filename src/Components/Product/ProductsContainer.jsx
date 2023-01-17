import Product from "./Product";

export default function ProductsContainer({
  handleShow,
  products,
  setProductDetail,
  loginStatus,
  wishlist,
  setWishlist,
}) {
  return (
    <div className="products">
      {products &&
        products.length &&
        products.map((product) => (
          <Product
            key={product.product_id}
            title={product.title}
            summary={product.summary}
            details={product.details}
            price={product.price}
            thumbnail={product.thumbnail}
            id={product.product_id}
            handleShow={handleShow}
            size={"18rem"}
            setProductDetail={setProductDetail}
            loginStatus={loginStatus}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        ))}
    </div>
  );
}
