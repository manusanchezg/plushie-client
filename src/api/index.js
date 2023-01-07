import axios from "axios";
axios.defaults.withCredentials = true;

class API {
  #url;
  constructor() {
    this.#url = "http://localhost:3100";
  }

  login(username, password) {
    return axios.post(this.#url + "/users/login", {
      username,
      password,
    });
  }

  isLoggedIn(setLoginStatus) {
    axios.get(this.#url + "/users/login").then((response) => {
      setLoginStatus(response.data);
    });
  }

  signup(username, password, email) {
    return axios.post(this.#url + "/users/register", {
      username: username,
      password: password,
      email: email,
    });
  }

  logout() {
    return axios.post(this.#url + "/users/logout");
  }

  getProducts() {
    return axios.get(this.#url + "/products").then((result) => result.data);
  }

  getGallery(id = 3) {
    return axios
      .get(this.#url + "/products/gallery/" + id)
      .then((result) => result.data);
  }

  getProductDetail(id) {
    return axios
      .get(this.#url + "/products/" + id)
      .then((result) => result.data);
  }

  getNewInProducts() {
    return axios.get(this.#url + "/new-in").then((result) => result.data);
  }

  getSaleProducts() {
    return axios.get(this.#url + "/sale").then((result) => result.data);
  }

  addToWishlist(username, productId) {
    return axios.post(this.#url + "/wishlist", {
      product_id: productId,
      username,
    });
  }

  deleteFromWishlist(username, product_id) {
    return axios.delete(
      `${this.#url}/wishlist/${username}?product_id=${product_id}`
    );
  }

  getWishlist(username) {
    return axios
      .get(this.#url + "/wishlist/" + username)
      .then((result) => result.data);
  }

  updateUserInfo(username, name, lastName, birthdate, shippingAddres) {
    axios.put(this.#url + "/users/" + username, {
      name,
      lastName,
      birthdate,
      shippingAddres,
    });
  }

  addToShoppingCart(username, productId, quantity) {
    return axios.post(this.#url + "/cart/" + username, {
      product_id: productId,
      quantity,
    });
  }

  getShoppingCart(username) {
    return axios
      .get(this.#url + "/cart/" + username)
      .then((result) => result.data);
  }

  deleteFromShoppingCart(username, product_id) {
    return axios.delete(
      this.#url + "/cart/" + username + "?product_id=" + product_id
    );
  }

  orderAtoZ() {
    return axios
      .get("http://localhost:3100" + "/products/atoz")
      .then((result) => result.data);
  }

  orderZtoA() {
    return axios
      .get("http://localhost:3100" + "/products/ztoa")
      .then((result) => result.data);
  }

  highestPrice() {
    return axios
      .get("http://localhost:3100" + "/products/highestPrice")
      .then((result) => result.data);
  }

  lowestPrice() {
    return axios
      .get("http://localhost:3100" + "/products/lowestPrice")
      .then((result) => result.data);
  }

  filterProducts(category_id) {
    return axios
      .post(this.#url + "/categories/filteredProducts", {
        category_id,
      })
      .then((result) => result.data);
  }
}

export default API;
