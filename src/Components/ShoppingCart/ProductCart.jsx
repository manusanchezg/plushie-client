import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import API from "../../api";
import Amount from "./Amount";

export default function ProductCart({
  loginStatus,
  cart,
  setCart,
  productDetail,
}) {
  const { product_id, color, size, quantity } = productDetail;
  const api = new API();
  const [product, setProduct] = useState({});
  const [currQuantity, setQuantity] = useState(quantity);

  const handleDelete = useCallback(
    (e) => {
      const id = e.target.id;
      api.deleteFromShoppingCart(loginStatus.user.username, id);
      const newCart = cart.filter((item) => item.product_id != id);
      setCart(newCart);
    },
    [loginStatus, cart]
  );

  useEffect(() => {
    if (loginStatus.loggedIn) {
      api.getProductDetail(product_id).then((result) => setProduct(result[0]));
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="product-cart-detail">
      <img src={product.thumbnail} alt="" className="w-25" />
      <div className="p-4 w-50">
        <h4>{product.title}</h4>
        <div className="details-container">
          <p>{product.details}</p>
          <p>Color: {color[0].toUpperCase() + color.slice(1)} </p>
          <p>Size: {size.toUpperCase()}</p>
        </div>
        <Button
          variant="outline-danger"
          id={product.product_id}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
      <p>Unit price: ${product.price}</p>
      <Amount
        quantity={currQuantity}
        api={api}
        color={color}
        size={size}
        productId={product_id}
        username={loginStatus.user.username}
        setQuantity={setQuantity}
      />
      <p>Total Price: ${product.price * currQuantity}</p>
    </div>
  );
}
