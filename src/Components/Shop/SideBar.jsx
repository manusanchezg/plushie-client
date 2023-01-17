import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import API from "../../api";
import "../../Style/SideBar.css";

export default function SideBar({
  setProducts,
  productsPerPage,
  currentPage,
  setCurrPage,
}) {
  const api = new API();

  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const [searchBar, setSearchBar] = useState("");

  function handleFilterPrice() {
    if (lowestPrice === 0 || highestPrice === 0)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Prices should not be empty",
      });
    else
      api
        .filterByPrice(lowestPrice, highestPrice, productsPerPage, currentPage)
        .then((products) => setProducts(products));
    setCurrPage(0);
  }

  function handleLowerPriceChange(e) {
    setLowestPrice(e.target.value, productsPerPage, currentPage);
    setCurrPage(0);
  }

  function handleHigherPriceChange(e) {
    setHighestPrice(e.target.value, productsPerPage, currentPage);
    setCurrPage(0);
  }

  function handleSearchBar(e) {
    if(e.target.value === "") {
      api.getProducts(productsPerPage, currentPage)
    }
    setSearchBar(e.target.value);
  }

  const filters = new Map([
    ["disney", 1],
    ["anime", 2],
    ["videogame", 3],
    ["classic", 4],
    ["bear", 5],
    ["fashion", 6],
  ]);

  const orders = new Map([
    ["aToZ", api.orderAtoZ],
    ["zToA", api.orderZtoA],
    ["highestPrice", api.highestPrice],
    ["lowestPrice", api.lowestPrice],
  ]);

  function handleOrderChange(e) {
    const func = orders.get(e.target.value);
    if (func)
      func(productsPerPage, currentPage).then((result) => setProducts(result));
    else
      api
        .getProducts(productsPerPage, currentPage)
        .then((result) => setProducts(result));
  }

  function handleFilterChange(e) {
    const categoryId = filters.get(e.target.value);
    if (categoryId) {
      api
        .filterProducts(categoryId, productsPerPage, currentPage)
        .then((result) => setProducts(result));
    } else {
      api
        .getProducts(productsPerPage, currentPage)
        .then((result) => setProducts(result));
    }
  }

  function searchProducts(e) {
    if (searchBar === "")
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Search should not be empty",
      });
    else {
      api.searchProducts(searchBar).then((result) => setProducts(result));
    }
  }

  function ChangeForm() {
    const burger = document.querySelector(".burger");
    const filterContainer = document.querySelector(".filter-container");
    const sideBar = document.querySelector(".side-bar");

    burger.classList.toggle("active");
    filterContainer.classList.toggle("hidden");
    sideBar.classList.toggle("smaller");
  }

  return (
    <div className="side-bar">
      <div
        className="burger active"
        onClick={ChangeForm}
        aria-controls="navbarScroll"
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="filter-container">
        <h2>Filter By:</h2>
        <Form className="d-flex pe-5">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={handleSearchBar}
          />
          <Button variant="outline-success" onClick={searchProducts}>
            Search
          </Button>
        </Form>
        <div>
          <label htmlFor="hypoallergenic">Hypoallergenic</label>{" "}
          <input type="checkbox" id="hypoallergenic" />
        </div>
        <div>
          <label htmlFor="freeShipping">Free Shipping</label>{" "}
          <input type="checkbox" id="freeShipping" />
        </div>
        <div>
          <label htmlFor="animalType">Animal type </label>{" "}
          <select
            name="animalType"
            id="animalType"
            onChange={handleFilterChange}
          >
            <option value="select">Select...</option>
            <option value="disney">Disney</option>
            <option value="anime">Anime</option>
            <option value="videogame">Videogame</option>
            <option value="classic">Classic</option>
            <option value="bear">Bear</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>
        <div>
          <label htmlFor="orderBy">Order By </label>{" "}
          <select name="orderBy" id="orderBy" onChange={handleOrderChange}>
            <option value="select">Select...</option>
            <option value="aToZ">A-Z</option>
            <option value="zToA">Z-A</option>
            <option value="highestPrice">Highest price</option>
            <option value="lowestPrice">Lowest price</option>
          </select>
        </div>
        <label htmlFor="price">Price </label>
        <div>
          <input
            type="number"
            id="lowPrice"
            placeholder="Min..."
            onChange={handleLowerPriceChange}
          />{" "}
          {" - "}
          <input
            type="number"
            id="highPrice"
            placeholder="Max..."
            onChange={handleHigherPriceChange}
          />
        </div>
        <Button onClick={handleFilterPrice}>Apply</Button>
      </div>
    </div>
  );
}
