import SideBar from "./SideBar";
import ProductsContainer from "../Product/ProductsContainer";
import Paginate from "./Pagination";
import { useEffect, useState } from "react";
import API from "../../api";
import Loader from "../Loader/Loader";

export default function Shop({
  handleShow,
  setProductDetail,
  loginStatus,
  wishlist,
  setWishlist,
}) {
  const productsPerPage = 12;
  const [currentPage, setCurrPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);

  const api = new API();

  useEffect(() => {
    api
      .getProducts(productsPerPage, currentPage)
      .then((res) => setProducts(res));
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div className="Shop">
      <SideBar
        setProducts={setProducts}
        productsPerPage={productsPerPage}
        currentPage={currentPage}
        setCurrPage={setCurrPage}
      />
      {products.length ? (
        <>
          <ProductsContainer
            handleShow={handleShow}
            setProductDetail={setProductDetail}
            products={products}
            loginStatus={loginStatus}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
          <Paginate
            currentPage={currentPage}
            setCurrPage={setCurrPage}
            productsPerPage={productsPerPage}
            pages={pages}
            setPages={setPages}
          />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
