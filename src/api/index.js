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

  async isLoggedIn() {
    const result = await axios.get(this.#url + "/users/login");
    return result.data;
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

  getProducts(itemsPerPage = 12, pageNumber = 0) {
    return axios
      .get(
        this.#url +
          `/products?page=${pageNumber * itemsPerPage}&number=${itemsPerPage}`
      )
      .then((result) => result.data);
  }

  getTotalProducts() {
    return axios
      .get(this.#url + "/products/total-products")
      .then((result) => result.data);
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

  addToShoppingCart(username, productId, quantity, color, size) {
    console.log(productId);
    return axios.post(this.#url + "/cart/" + username, {
      product_id: productId,
      quantity,
      color,
      size,
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

  orderAtoZ(itemsPerPage = 12, pageNumber = 0) {
    return axios
      .get(
        `http://localhost:3100/products/atoz?page=${
          pageNumber * itemsPerPage
        }&number=${itemsPerPage}`
      )
      .then((result) => result.data);
  }

  orderZtoA(itemsPerPage = 12, pageNumber = 0) {
    return axios
      .get(
        `http://localhost:3100/products/ztoa?page=${
          pageNumber * itemsPerPage
        }&number=${itemsPerPage}`
      )
      .then((result) => result.data);
  }

  highestPrice(itemsPerPage = 12, pageNumber = 0) {
    return axios
      .get(
        `http://localhost:3100/products/highestPrice?page=${
          pageNumber * itemsPerPage
        }&number=${itemsPerPage}`
      )
      .then((result) => result.data);
  }

  lowestPrice(itemsPerPage = 12, pageNumber = 0) {
    return axios
      .get(
        `http://localhost:3100/products/lowestPrice?page=${
          pageNumber * itemsPerPage
        }&number=${itemsPerPage}`
      )
      .then((result) => result.data);
  }

  filterProducts(category_id, itemsPerPage = 12, pageNumber = 0) {
    return axios
      .post(this.#url + `/categories/filteredProducts`, {
        category_id,
        page: pageNumber * itemsPerPage,
        number: itemsPerPage,
      })
      .then((result) => result.data);
  }

  filterByPrice(lowestPrice, highestPrice, itemsPerPage = 12, pageNumber = 0) {
    return axios
      .post(
        `${this.#url}/products/filter-price?page=${
          pageNumber * itemsPerPage
        }&number=${itemsPerPage}`,
        { lowestPrice, highestPrice }
      )
      .then((result) => result.data);
  }

  searchProducts(string, itemsPerPage = 12, pageNumber = 0) {
    return axios
      .post(this.#url + `/products?search=${string}`, {
        page: pageNumber * itemsPerPage,
        number: itemsPerPage,
      })
      .then((result) => result.data);
  }

  getVariations(id) {
    return axios
      .get(`${this.#url}/variations/${id}`)
      .then((result) => result.data);
  }

  getStock(color, size, id) {
    return axios
      .post(`${this.#url}/variations/stock/${id}`, { color, size })
      .then((result) => result.data);
  }

  updateAmount(color, size, quantity, username, product_id) {
    return axios
      .put(`${this.#url}/cart/${username}`, {
        color,
        size,
        quantity,
        product_id,
      })
      .then((result) => result.data);
  }

  async getTotalPurchase(username) {
    const total = await axios.get(
      `${this.#url}/cart/total-purchase/${username}`
    );
    return total.data[0].total;
  }

  async createNewOrder(username, total, orderDate, arrivedDate) {
    const result = await axios.post(`${this.#url}/orders/${username}`, {
      total,
      orderDate,
      arrivedDate,
    });
    return result.data;
  }

  async setProductsInOrder(orderId, productId, quantity, color, size) {
    const result = await axios.post(
      `${this.#url}/orders/${orderId}/product/${productId}`,
      { quantity, color, size }
    );
    return result.data;
  }

  async getOrders(username) {
    const orders = await axios.get(`${this.#url}/orders/${username}`)
    return orders.data
  }

  async getOrderDetails(username, orderId) {
    const orderDetail = await axios.get(`${this.#url}/orders/${username}/${orderId}`)
    return orderDetail.data
  }

  async getStatus(statusId) {
   const status = await axios.get(`${this.#url}/orders/status/${statusId}`)
   return status.data[0].name
  }
}

export default API;
