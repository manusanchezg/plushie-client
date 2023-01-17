import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Importing style
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/Navigation.css";
import "./Style/HomePage.css";
import "./index.css";
import "./Style/ProductsContainer.css";
import "./Style/Shop.css";
import "./Style/Profile.css";
import "./Style/ShoppingCart.css";
import "./Style/MinWishlistCard.css";

// Importing components
//////////////////////////////
import HomePage from "./Components/Home/HomePage";
import Navigation from "./Components/Home/Navigation";
import LoginNav from "./Components/Home/LoginNav";
import LogIn from "./Components/Home/Login";
import SignUp from "./Components/Home/Signup";

import Shop from "./Components/Shop/Shop";
import ProductDetail from "./Components/Product/ProductDetail";

import Profile from "./Components/Profile/Profile";

import Wishlist from "./Components/Wishlist/Wishlist";

import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";

import API from "./api";
//////////////////////////////

function App() {
  const api = new API();

  const [productDetail, setProductDetail] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loginStatus, setLoginStatus] = useState({});

  ////////////////////////
  // Showing and hiding Product Detail pop-up
  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => setShowDetail(true);

  // Showing and hiding Wishlist pop-up
  const [showWishlist, setShowWishlist] = useState(false);
  const handleCloseWishlist = () => setShowWishlist(false);
  const handleShowWishlist = () => setShowWishlist(true);

  // Showing and hiding Sign up pop-up
  const [showSignUp, setSignUp] = useState(false);
  const handleShowSignUp = () => setSignUp(true);

  // Showing and hiding Log in pop-up
  const [showLogIn, setLogIn] = useState(false);
  const handleShowLogIn = () => setLogIn(true);
  /////////////////////////////

  const isLoggedIn = useCallback(async () => {
    const result = await api.isLoggedIn();
    setLoginStatus(result);
  });

  useEffect(() => {
    isLoggedIn();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loginStatus.loggedIn) {
      api
        .getWishlist(loginStatus.user.username)
        .then((result) => setWishlist(result));
    }
    // eslint-disable-next-line
  }, [loginStatus]);

  return (
    <>
      <LoginNav
        handleShowSignUp={handleShowSignUp}
        handleShowLogIn={handleShowLogIn}
        loginStatus={loginStatus}
      />
      <Navigation handleShow={handleShowWishlist} />
      {productDetail && Object.keys(productDetail).length ? (
        <ProductDetail
          handleShow={handleShowDetail}
          show={showDetail}
          productDetail={productDetail}
          loginStatus={loginStatus}
          setShowDetail={setShowDetail}
          setProductDetail={setProductDetail}
        />
      ) : null}
      <Wishlist
        handleShow={handleShowWishlist}
        show={showWishlist}
        loginStatus={loginStatus}
        wishlist={wishlist}
        handleClose={handleCloseWishlist}
        handleShowDetail={handleShowDetail}
        setProductDetail={setProductDetail}
      />
      <LogIn
        setLogIn={setLogIn}
        show={showLogIn}
        handleShowSignUp={handleShowSignUp}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />
      <SignUp setSignUp={setSignUp} show={showSignUp} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomePage
              handleShow={handleShowDetail}
              setProductDetail={setProductDetail}
              loginStatus={loginStatus}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />
        <Route
          exact
          path="/shop"
          element={
            <Shop
              handleShow={handleShowDetail}
              setProductDetail={setProductDetail}
              loginStatus={loginStatus}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <Profile
              handleShow={handleShowDetail}
              setProductDetail={setProductDetail}
              loginStatus={loginStatus}
              handleShowLogIn={handleShowLogIn}
              handleClose={handleCloseWishlist}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <ShoppingCart
              loginStatus={loginStatus}
              handleShowLogIn={handleShowLogIn}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
