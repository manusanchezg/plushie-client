import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Slider from "../Wishlist/Slider";

export default function OrderCard({
  id,
  statusId,
  totalPrice,
  ordered,
  arrived,
  api,
  username,
}) {
  const [order, setOrder] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [products, setProducts] = useState([])
  const [orderDate, setOrderDate] = useState("");
  const [arrivedDate, setArrivedDate] = useState("");
  const [status, setStatus] = useState("")

  console.log();
  const changeDateString = useCallback((string, setString) => {
    string = string.split("T");
    const year = string[0].split("-")[0];
    const month = string[0].split("-")[1];
    const day = string[0].split("-")[2];

    setString(`${day}-${month}-${year}`);
  });
  const getOrderDetails = useCallback(async () => {
    const productsDetails = await api.getOrderDetails(username, id);
    setOrder(productsDetails);
  });

  const getProductsDetail = useCallback(async () => {
    const products = [];
    for (let i = 0; i < order.length; i++) {
      const product = await api.getProductDetail(order[i].product_id);
      products.push({url: product[0].thumbnail});
    }
    setGallery(products)
  });

  const getStatus = useCallback(async () => {
    const status = await api.getStatus(statusId)
    setStatus(status)
  }, [])

  useEffect(() => {
    getOrderDetails();
    getProductsDetail();
    getStatus()
    changeDateString(ordered, setOrderDate);
    changeDateString(arrived, setArrivedDate);
  }, []);

  return (
    <div className="order-border">
      <h2>
        Buyed Date: <span>{orderDate}</span>
      </h2>
      <div className="detail-container">
        <Slider gallery={gallery} />
        <div>
          <h3>Status: {status && status}</h3>
          <p>Estimated arrival: {arrivedDate}</p>
        </div>
        {order.map(product => (
          <p>{product.title}</p>
        ))}
        <p>
          Titles of the product that were purchased, if the number of letters is
          more than the max ...
        </p>
        <Button variant="success">Buy again</Button>
      </div>
    </div>
  );
}
