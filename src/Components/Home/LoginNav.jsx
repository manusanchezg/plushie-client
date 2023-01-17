import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import logOut from "../../Hooks/logOut";

export default function LoginNav({
  handleShowSignUp,
  handleShowLogIn,
  loginStatus,
}) {
  const api = new API();
  const navigate = useNavigate();
  function handleLogOut() {
    logOut().then(() => {
      api
        .logout()
        .then(() => navigate("/"))
        .then(() => window.location.reload());
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
