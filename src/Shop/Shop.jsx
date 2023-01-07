import SideBar from "./SideBar";
import ProductsContainer from "./ProductsContainer";
import Paginate from "./Pagination";

export default function Shop({
  handleShow,
  products,
  setProductDetail,
  loginStatus,
  wishlist,
  setWishlist,
  setProducts,
}) {
  return (
    <>
      <div className="Shop">
        <SideBar products={products} setProducts={setProducts} />
        <ProductsContainer
          handleShow={handleShow}
          setProductDetail={setProductDetail}
          products={products}
          loginStatus={loginStatus}
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
        <Paginate />
      </div>
    </>
  );
}
