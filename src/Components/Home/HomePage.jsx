import Container from "react-bootstrap/Container";
import HomePageSlider from "./HomePageSlider";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductRow from "../Product/ProductRow";
import gallery1 from "../../assets/gallery1.jpg";
import gallery2 from "../../assets/gallery2.jpg";
import API from "../../api";
import { useEffect, useState } from "react";

const gallery = [
  "https://9to5toys.com/wp-content/uploads/sites/5/2022/11/Squishmallows-plushies.jpg",
  gallery1,
  gallery2,
];

export default function HomePage({
  handleShow,
  setProductDetail,
  loginStatus,
  wishlist,
  setWishlist,
}) {
  const [newIn, setNewIn] = useState([]);
  const [sale, setSale] = useState([]);
  const api = new API();

  useEffect(() => {
    api.getNewInProducts().then((result) => setNewIn(result));
    api.getSaleProducts().then((result) => setSale(result));
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="mt-4">
          <HomePageSlider gallery={gallery} />
        </Col>
      </Row>
      <h2 className="ms-5">New in...</h2>
      <ProductRow
        handleShow={handleShow}
        products={newIn}
        setProductDetail={setProductDetail}
        loginStatus={loginStatus}
        wishlist ={wishlist}
        setWishlist={setWishlist}
      />
      <h2 className="ms-5">Sale!</h2>
      <ProductRow
        handleShow={handleShow}
        products={sale}
        setProductDetail={setProductDetail}
        loginStatus={loginStatus}
        wishlist = {wishlist}
        setWishlist={setWishlist}
      />
    </Container>
  );
}
