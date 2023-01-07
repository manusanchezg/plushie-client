import { Button } from "react-bootstrap";
import API from "../api";
import "../Style/SideBar.css";

export default function SideBar({ products, setProducts }) {
  const api = new API();

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
    ["select", api.getProducts],
  ]);

  function handleOrderChange(e) {
    const func = orders.get(e.target.value);
    func().then((result) => setProducts(result));
  }

  function handleFilterChange(e) {
    const categoryId = filters.get(e.target.value);
    api.filterProducts(categoryId).then((result) => setProducts(result));
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
    <>
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
            <input type="number" id="lowPrice" placeholder="Min..." /> {" - "}
            <input type="number" id="highPrice" placeholder="Max..." />
          </div>
          <Button>Apply</Button>
        </div>
      </div>
    </>
  );
}
