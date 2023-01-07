import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import API from "../api";
import ProductCart from "../Shop/ProductCart";
import Cart from "../assets/cart.svg";

export default function ShoppingCart({ loginStatus, handleShowLogIn }) {
  const api = new API();
  const [cart, setCart] = useState([]);
  const [prices, setPrice] = useState([]);

  useEffect(() => {
    if (loginStatus && loginStatus.loggedIn) {
      api
        .getShoppingCart(loginStatus.user.username)
        .then((result) => setCart(result));
    }
    //eslint-disable-next-line
  }, []);

  //console.log(prices)

  if (loginStatus.loggedIn)
    return (
      <div className="shopping-cart">
        <div className="order-details">
          <h2>
            Ship to:{" "}
            <span id="address">{loginStatus.user.shippingAddress}</span>
          </h2>
          <h3 className="table-header">Summary:</h3>
          <div className="item-detail scrollbar-hidden h-100">
            {cart && cart.length ? (
              cart.map((product, idx) => (
                <ProductCart
                  key={idx}
                  productId={product.product_id}
                  setPrice={setPrice}
                  quantity={product.quantity}
                  prices={prices}
                  loginStatus={loginStatus}
                  cart={cart}
                  setCart={setCart}
                />
              ))
            ) : (
              <figure className="text-center mt-5">
                <img src={Cart} alt="" className="w-25"/>
                <figcaption className="mt-3">You don't have items yet</figcaption>
              </figure>
            )}
          </div>
        </div>
        <div className="checkout-info">
          <h2>Order Summary</h2>
          <div className="price-info">
            <p>Subtotal</p> <p>$$$$$</p>{" "}
          </div>
          <div></div>
          <Button variant="success">Checkout now</Button>
        </div>
      </div>
    );
  else handleShowLogIn();
}
