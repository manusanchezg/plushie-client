import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import API from "../../api";

export default function SignUp({ show, setSignUp }) {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [error, setError] = useState({});
  const handleCloseSignUp = () => setSignUp(false);

  const api = new API();

  function register() {
    if (
      Object.keys(error).length ||
      usernameReg === "" ||
      passwordReg === "" ||
      emailReg === ""
    ) {
      Swal.fire({
        title: "Error",
        text: "Some fields are wrong, you should checkout them",
        icon: "warning",
      });
    } else {
      api
        .signup(usernameReg, passwordReg, emailReg)
        .then((response) => {
          Swal.fire({
            title: "Sign up successful",
            text: "Welcome " + usernameReg,
            icon: "success",
            timer: 2000,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong",
            icon: "warning",
            timer: 2000,
          });
        });
    }
  }

  function handleUsernameInput(e) {
    const regex = /[a-z]/;
    let p = document.getElementById("usernameControl");
    let usernameError;
    setUsernameReg(e.target.value);
    if (e.target.value.length > 16 || e.target.value.length < 6) {
      usernameError = "User must be between 6 and 16 characters";
      p.textContent = usernameError;
      setError({ ...error, usernameError });
    } else if (!regex.test(e.target.value)) {
      usernameError = "User must be only letters";
      p.textContent = usernameError;
      setError({ ...error, usernameError });
    } else {
      p.textContent = "";
      delete error.usernameError;
    }
  }

  function handlePasswordInput(e) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,17}$/;
    let p = document.getElementById("passwordControl");
    let passwordError;
    setPasswordReg(e.target.value);
    if (e.target.value === "") {
      passwordError = "Password is mandatory";
      p.textContent = passwordError;
      setError({ ...error, passwordError });
    } else if (!regex.test(e.target.value)) {
      passwordError =
        "Password must be between 8 and 16 character, contain one lower case and uppercase letter and one number";
      p.textContent = passwordError;
      setError({ ...error, passwordError });
    } else {
      p.textContent = "";
      delete error.passwordError;
    }
  }

  function handleEmailInput(e) {
    // eslint-disable-next-line
    const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-z]{2,5}).{1,4}$/;
    let emailError;
    setEmailReg(e.target.value);
    let p = document.getElementById("emailControl");
    if (e.target.value === "") {
      emailError = "Email is mandatory";
      p.textContent = emailError;
      setError({ ...error, emailError });
    } else if (!regex.test(e.target.value)) {
      emailError = "Incorrect email";
      p.textContent = emailError;
      setError({ ...error, emailError });
    } else {
      p.textContent = "";
      delete error.emailError;
    }
  }

  function handleRepeatedPassword(e) {
    const p = document.getElementById("repeatPasswordControl");
    if (e.target.value !== passwordReg) {
      let passwordError = "Passwords are not the same";
      p.textContent = passwordError;
      setError({ ...error, passwordError });
    } else {
      p.textContent = "";
      delete error.passwordError;
    }
  }

  return (
    <Modal show={show} onHide={handleCloseSignUp} dialogClassName="sign-modal">
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={handleUsernameInput}
          />
          <Form.Text className="text-muted">
            We'll never share your information with anyone else.
          </Form.Text>
          <p id="usernameControl"></p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleEmailInput}
          />
          <p id="emailControl"></p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePasswordInput}
          />
          <p id="passwordControl"></p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
          <Form.Label>Repeat password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            onChange={handleRepeatedPassword}
          />
          <p id="repeatPasswordControl"></p>
        </Form.Group>
        <Button variant="outline-success" type="button" onClick={register}>
          Sign up
        </Button>
      </Form>
    </Modal>
  );
}
