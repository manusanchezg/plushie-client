import Cart from "../../assets/cart.svg";

export default function NoItems() {
  return (
    <figure className="text-center mt-5">
      <img src={Cart} alt="" className="w-25" />
      <figcaption className="mt-3">You don't have items yet</figcaption>
    </figure>
  );
}
