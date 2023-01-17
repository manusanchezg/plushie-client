import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import API from "../../api";
import ProductCart from "./ProductCart";
import NoItems from "./NoItems";
import Loader from "../Loader/Loader";
import useLoader from "../../Hooks/useLoader";
import firePopUp from "../../Hooks/firePopUp";

export default function ShoppingCart({ loginStatus, handleShowLogIn }) {
  const api = new API();
  const [cart, setCart] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPrice, setTotal] = useState(0);

  async function getTotalPurchase() {
    const total = await api.getTotalPurchase(loginStatus.user.username);
    setTotal(total);
  }

  async function handleNewOrder() {
    const date = new Date();
    const orderDate = convertToString(date);
    const arrivedDate = convertToString(date, true);
    const order = await api.createNewOrder(
      loginStatus.user.username,
      totalPrice,
      orderDate,
      arrivedDate
    );
    clearShoppingCart(order.id)
  }

  function clearShoppingCart(orderId) {
    console.log(orderId)
    cart.map((product) => {
      api.setProductsInOrder(
        orderId,
        product.product_id,
        product.quantity,
        product.color,
        product.size
      );
      api.deleteFromShoppingCart(loginStatus.user.username, product.product_id);
      // result
      //   .then(() => {
      //     firePopUp("sucess", "Great!", "Your order was created succesfully!")
      //     setCart([])
      // }
      //   )
      //   .catch(() =>
      //     firePopUp("error", "Oops!", "Something went wrong, try again!")
      //   );
    });
  }

  function convertToString(date, isArrivedDate = false) {
    if (isArrivedDate) {
      date = new Date(
        date.getFullYear(),
        date.getMonth(),
        Number(date.getDate()) + 21
      );
    }
    const month = Number(date.getMonth()) + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const newMonth = month < 10 ? "0" + month.toString() : month;
    const newDay = Number(day) < 10 ? "0" + day : day;
    return `${year}-${newMonth}-${newDay}`;
  }

  useEffect(() => {
    setTimeout(() => {
      if (loginStatus && loginStatus.loggedIn) {
        api
          .getShoppingCart(loginStatus.user.username)
          .then((result) => setCart(result))
          .then(() => setLoading(false));
      }
    }, 1500);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTotalPurchase();
  }, []);

  const component = (
    <div className="shopping-cart">
      <div className="order-details">
        <h2>
          Ship to: <span id="address">{loginStatus.user.shippingAddress}</span>
        </h2>
        <h3 className="table-header">Summary:</h3>
        <div className="item-detail scrollbar-hidden h-100">
          {cart && cart.length ? (
            cart.map((product, idx) => (
              <ProductCart
                key={idx}
                loginStatus={loginStatus}
                cart={cart}
                setCart={setCart}
                productDetail={product}
              />
            ))
          ) : (
            <NoItems />
          )}
        </div>
      </div>
      <div className="checkout-info">
        <h2>Order Summary</h2>
        <div className="price-info">
          <p>Subtotal</p> <p>${totalPrice}</p>{" "}
        </div>
        <div></div>
        <Button variant="success" onClick={handleNewOrder}>
          Checkout now
        </Button>
      </div>
    </div>
  );

  return useLoader(component, <Loader />, isLoading);
}
