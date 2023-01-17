import { useCallback, useEffect, useState } from "react";
import API from "../../api";

export default function Stock({
  setQuantity,
  variations,
  currStock,
  currSize,
  currColor,
  setCurrStock,
  id,
  quantity,
}) {
  const api = new API();
  const [stock, setStock] = useState([]);

  const renderStock = useCallback(
    (e) => {
      const arr = [];
      if (currStock > 0) {
        for (let i = 1; i <= currStock; i++) {
          const element = <option key={i}>{i}</option>;
          arr.push(element);
        }
        setStock([...arr]);
      } else {
        setStock(["No stock"]);
      }
    },
    [currStock]
  );

  useEffect(() => {
    renderStock();
  }, [currStock]);

  useEffect(() => {
    if (currColor && currSize) {
      api
        .getStock(currColor, currSize, id)
        .then((stock) => (stock ? setCurrStock(stock[0].stock) : null));
    }
  }, [variations, currColor, currSize, id]);

  const handleChange = useCallback(
    (e) => {
      setQuantity(Number(e.target.value));
    },
    [quantity]
  );

  return (
    <div className="select">
      <label htmlFor="amount">Amount: </label>
      <select name="stock" id="stock" onChange={handleChange}>
        <option>Select...</option>
        {stock.map((item) => item)}
      </select>
    </div>
  );
}
