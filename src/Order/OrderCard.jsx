import { Button } from "react-bootstrap";
import Slider from "../Wishlist/Slider";

export default function OrderCard() {
  return (
    <div className="order-border">
      <h2>
        Buyed Date: <span>16/11/2022</span>
      </h2>
      <div className="detail-container">
        <Slider gallery={[]}/>
        <div>
          <h3>Status</h3>
          <p>Estimated arrival: 26/12/2022</p>
        </div>
        <p>
          Titles of the product that were purchased, if the number of letters is
          more than the max ...
        </p>
        <Button variant="success">Buy again</Button>
      </div>
    </div>
  );
}
