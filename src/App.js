import { useEffect, useState } from "react";
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
import HomePage from "./Home/HomePage";
import Navigation from "./Home/Navigation";
import LoginNav from "./Home/LoginNav";
import LogIn from "./Home/Login";
import SignUp from "./Home/Signup";

import Shop from "./Shop/Shop";
import ProductDetail from "./Shop/ProductDetail";

import Profile from "./Profile/Profile";

import Wishlist from "./Wishlist/Wishlist";

import ShoppingCart from "./Order/ShoppingCart";

import API from "./api";
//////////////////////////////

function App() {
  const api = new API();

  const [products, setProducts] = useState([]);
  const [productDetail, setProductDetail] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [loginStatus, setLoginStatus] = useState({});

  ////////////////////////
  // Showing and hiding Product Detail pop-up
  const [showDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);
  
  // Showing and hiding Wishlist pop-up
  const [showWishlist, setShowWishlist] = useState(false);
  const handleCloseWishlist = () => setShowWishlist(false);
  const handleShowWishlist = () => setShowWishlist(true);
  
  // Showing and hiding Sign up pop-up
  const [showSignUp, setSignUp] = useState(false);
  const handleCloseSignUp = () => setSignUp(false);
  const handleShowSignUp = () => setSignUp(true);
  
  // Showing and hiding Log in pop-up
  const [showLogIn, setLogIn] = useState(false);
  const handleCloseLogIn = () => setLogIn(false);
  const handleShowLogIn = () => setLogIn(true);
/////////////////////////////

  useEffect(() => {
    api.isLoggedIn(setLoginStatus);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    api.getProducts().then((res) => setProducts(res));
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
      {productDetail && Object.keys(productDetail).length ?
      <ProductDetail
      handleShow={handleShowDetail}
      show={showDetail}
      productDetail={productDetail}
      handleClose={handleCloseDetail}
      loginStatus={loginStatus}
      />
    : null
    }
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
        handleClose={handleCloseLogIn}
        show={showLogIn}
        handleShowSignUp={handleShowSignUp}
        loginStatus={loginStatus}
        setLoginStatus={setLoginStatus}
      />
      <SignUp handleClose={handleCloseSignUp} show={showSignUp} />
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
              products={products}
              loginStatus={loginStatus}
              wishlist={wishlist}
              setWishlist={setWishlist}
              setProducts={setProducts}
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
