import { useEffect, useState } from "react";

export default function Color({ variations, setCurrColor }) {
  const [colors, setColors] = useState([]);

  function setAvailableColors() {
    const productColors = new Set();
    for (const variation of variations) {
      if (!colors.includes(variation.color)) productColors.add(variation.color);
      setColors([...productColors]);
    }
  }

  function handleOnChange(e) {
    setCurrColor(e.target.value);
  }

  useEffect(() => {
    setAvailableColors();
  }, [variations]);

  return (
    <div className="select">
      <label htmlFor="color">Color: </label>
      <select name="color" id="color" onChange={handleOnChange}>
        <option value="">Select...</option>
        {colors.map((color) => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
}
