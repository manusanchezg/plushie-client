import { useCallback, useEffect, useState } from "react";
import useLoader from "../../Hooks/useLoader";

export default function Amount({
  quantity,
  api,
  color,
  size,
  productId,
  username,
  setQuantity,
}) {
  const [amount, setAmount] = useState([]);
  const [loading, setLoading] = useState(true);

  async function renderAmount() {
    const stockApi = await api.getStock(color, size, productId);
    const arr = [];
    for (let i = 1; i <= stockApi[0].stock; i++) {
      const element = <option key={i}>{i}</option>;
      arr.push(element);
    }
    setAmount(arr);
  }

  const handleChange = useCallback((e) => {
    setQuantity(e.target.value);
    api.updateAmount(color, size, quantity, username, productId);
  }, []);

  useEffect(() => {
    renderAmount();
    setLoading(false);
  }, []);

  const component = (
    <div>
      <label htmlFor="amount">Amount: </label>{" "}
      <select
        name="amount"
        id="amount"
        value={quantity}
        onChange={handleChange}
      >
        {amount.length > 0 && amount.map((item) => item)}
      </select>
    </div>
  );

  return useLoader(component, <>Loading...{"  "}</>, loading);
}
