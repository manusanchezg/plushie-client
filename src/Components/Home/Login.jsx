import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import API from "../../api";
import firePopUp from "../../Hooks/firePopUp";

export default function LogIn({
  show,
  setLogIn,
  handleShowSignUp,
  loginStatus,
  setLoginStatus,
}) {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const handleCloseLogIn = () => setLogIn(false);

  const api = new API();

  function login() {
    api.login(usernameLog, passwordLog).then((result) => {
      firePopUp("success", "Login successful", "Welcome " + usernameLog)
        .then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
        .then((res) => {
          api.isLoggedIn();
        })
        .catch((err) => {
          firePopUp(
            "error",
            "User not found",
            "Password or username incorrect"
          );
        });
    });
  }

  function handleUsernameInput(e) {
    setUsernameLog(e.target.value);
  }
  function handlePasswordInput(e) {
    setPasswordLog(e.target.value);
  }

  async function handleLogIn() {
    const loggedIn = await api.isLoggedIn();
    setLoginStatus(loggedIn);
  }

  useEffect(() => {
    handleLogIn();
  }, []);

  return (
    <Modal show={show} onHide={handleCloseLogIn} dialogClassName="sign-modal">
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
              handleCloseLogIn();
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
