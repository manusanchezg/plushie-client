import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Profile from "../assets/profile.svg";
import Cart from "../assets/cart.svg";
import Wlnavbar from "../assets/wlnavbar.svg";
import { Link } from "react-router-dom";

function Navigation({ handleShow }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link to="/" className="link">
              <Nav.Link as="p">Home</Nav.Link>
            </Link>
            <Link to="/shop" className="link">
              <Nav.Link as="p">Shop</Nav.Link>
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className="logo-container navbar">
            <Nav.Link as="p">
              {" "}
              <Link to="/profile">
                <img src={Profile} alt="" className="logo" />
              </Link>
            </Nav.Link>
            <Nav.Link as="p">
              {" "}
              <Link to="/cart">
                <img src={Cart} alt="" className="logo" />
              </Link>
            </Nav.Link>
            <Nav.Link onClick={handleShow}>
              {" "}
              <img src={Wlnavbar} alt="" className="logo" />
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
