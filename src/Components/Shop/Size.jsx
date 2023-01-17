export default function Size({ setCurrSize }) {
  function handleChange(e) {
    setCurrSize(e.target.value);
  }
  return (
    <div className="select">
      <label htmlFor="size">Size: </label>
      <select name="size" id="size" onChange={handleChange}>
        <option value="">Select...</option>
        <option value="s"> S </option>
        <option value="m"> M </option>
        <option value="l"> L </option>
        <option value="xl"> XL </option>
        <option value="xxl"> XXL </option>
      </select>
    </div>
  );
}
