import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import API from "../api";
import Swal from "sweetalert2";

export default function LogIn({
  show,
  handleClose,
  handleShowSignUp,
  loginStatus,
  setLoginStatus,
}) {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");

  const api = new API();

  function login() {
    api.login(usernameLog, passwordLog).then((result) => {
      if (result.status === 200) {
        Swal.fire({
          title: "Login successful",
          text: "Welcome " + usernameLog,
          icon: "success",
        })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          })
          .then((res) => {
            this.isLoggedIn();
          })
          .catch((err) => {
            if (err.response.status === 404)
              Swal.fire({
                title: "User not found",
                text: "Password or username incorrect",
                icon: "error",
              });
          });
      }
    });
  }

  function handleUsernameInput(e) {
    setUsernameLog(e.target.value);
  }
  function handlePasswordInput(e) {
    setPasswordLog(e.target.value);
  }

  useEffect(() => {
    api.isLoggedIn(setLoginStatus, loginStatus);
  }, []);

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="sign-modal">
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={handleUsernameInput}
          />
          <Form.Text className="text-muted">
            We'll never share your information with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordInput}
          />
        </Form.Group>
        <p className="signup">
          New here?{" "}
          <span
            onClick={() => {
              handleClose();
              handleShowSignUp();
            }}
          >
            Sign up
          </span>
        </p>
        <Button variant="outline-success" type="button" onClick={login}>
          Log in
        </Button>
      </Form>
    </Modal>
  );
}
