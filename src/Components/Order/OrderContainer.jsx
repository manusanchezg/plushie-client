import { useCallback, useEffect, useState } from "react";
import API from "../../api";
import OrderCard from "./OrderCard";

export default function OrderContainer({ loginStatus }) {
  const api = new API();
  const username = loginStatus.user.username;
  const [orders, setOrders] = useState([]);

  const getOrders = useCallback(async () => {
    const ordersToSet = await api.getOrders(username);
    setOrders(ordersToSet);
  });

  useEffect(() => {
    getOrders();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="orders scrollbar-hidden">
      <h2>My orders</h2>
      {orders.length &&
        orders.map((order) => (
          <OrderCard
            key={order.id}
            id={order.id}
            statusId={order.status_id}
            totalPrice={order.total_price}
            ordered={order.order_date}
            arrived={order.arrived_date}
            api={api}
            username={username}
          />
        ))}
    </div>
  );
}
