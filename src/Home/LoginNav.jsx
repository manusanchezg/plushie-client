import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../api";

export default function LoginNav({
  handleShowSignUp,
  handleShowLogIn,
  loginStatus,
}) {
  const api = new API();
  const navigate = useNavigate()
  function handleLogOut() {
    Swal.fire({
      title: "Do you want to log out?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Log out`,
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire("Logged out succesful").then(() => {
          api
            .logout()
            .then(() => navigate("/"))
            .then(() => window.location.reload());
        });
      }
    });
  }
  const loggedIn = (
    <div>
      {loginStatus.user && <span>Hello, {loginStatus.user.username}</span>}{" "}
      <Button variant="outline-danger" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
  const logIn = (
    <>
      <Button onClick={handleShowLogIn} variant="outline-success">
        Log in
      </Button>
      <Button onClick={handleShowSignUp} variant="outline-dark">
        Sign up
      </Button>
    </>
  );

  return (
    <div className="login-container">
      {loginStatus.loggedIn ? loggedIn : logIn}
    </div>
  );
}
