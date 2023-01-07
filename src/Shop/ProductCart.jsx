import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import API from "../api";

export default function ProductCart({
  productId,
  setPrice,
  quantity,
  prices,
  loginStatus,
  cart,
  setCart,
}) {
  const api = new API();
  const [product, setProduct] = useState({});

  function handleDelete(e) {
    const id = e.target.id;
    // api.deleteFromShoppingCart(loginStatus.user.username, id);
    const newCart = cart.filter((item) => item.product_id != id);
    setCart(newCart);
    console.log(cart.filter((item) => item.product_id != id));
  }


  useEffect(() => {
    if (loginStatus.loggedIn) {
      api.getProductDetail(productId).then((result) => setProduct(result[0]));
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setPrice([Number(product.price), ...prices]);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="product-cart-detail">
      <img src={product.thumbnail} alt="" className="w-25" />
      <div className="p-4 w-50">
        <h4>{product.title}</h4>
        <p>{product.details}</p>
        <Button
          variant="outline-danger"
          id={product.product_id}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
      <p>Unit price: ${product.price}</p>
      <div>
        <label htmlFor="amount">Amount: </label>{" "}
        <select name="amount" id="amount">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
        </select>
      </div>
      <p>Total Price: ${product.price * quantity}</p>
    </div>
  );
}
