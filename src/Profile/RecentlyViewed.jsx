import { useEffect, useState } from "react";
import API from "../api";
import Product from "../Shop/Product";

export default function RecentlyViewed({ handleShow, setProductDetail, setWishlist }) {
  const [products, setProducts] = useState([])
  const api = new API()

  useEffect(() => {
    api.getProducts().then(result => setProducts(result.slice(0, 4)))
    //eslint-disable-next-line
  }, [])
  return (
    <div className="view-products-container">
      <h2>Recently viewed</h2>
      <div className="viewed-products">
        {products && products.length && products.map(product => (
          <Product
           size={"15rem"}
           handleShow={handleShow}
           setProductDetail={setProductDetail}
           title={product.title}
           summary={product.summary}
           price={product.price}
           thumbnail={product.thumbnail}
           id={product.product_id}
           setWishlist={setWishlist}
           />

        ))}
        <p>More {">"}</p>
      </div>
    </div>
  );
}
