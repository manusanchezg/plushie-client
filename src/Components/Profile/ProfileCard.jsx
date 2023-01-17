import profilePic from "../../assets/profile.svg";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import logOut from "../../Hooks/logOut";
import UserData from "./UserData";
import ProfileWishlist from "./ProfileWishlist";

export default function ProfileCard({
  setProductDetail,
  handleClose,
  wishlist,
  handleShow,
  loginStatus,
}) {
  const api = new API();
  const navigate = useNavigate();
  const user = loginStatus.user || null;

  function handleLogOut() {
    logOut().then(() => {
      api
        .logout()
        .then(() => navigate("/"))
        .then(() => window.location.reload());
    });
  }

  function dateToString(date) {
    const year = date.split("-")[0]
    const month = date.split("-")[1]
    const day = Number(date.split("-")[2].split("T")[0]) + 1
    return `${day}-${month}-${year}`
  }

  return (
    <div className="float-container">
      <div className="profile-container">
        <img src={profilePic} alt="" />
        <div className="info">
          <h3>{user.name + " " + user.lastName || user.username}</h3>
          <p>
            {dateToString(user.birthdate) ||
              "You didn't upload your birthdate yet, what are you waiting for?"}
          </p>
        </div>
        <Button variant="outline-danger" onClick={handleLogOut}>
          Sign out
        </Button>
      </div>
      <div>
        <UserData user={user} api={api} />
        <ProfileWishlist
          wishlist={wishlist}
          handleShow={handleShow}
          handleClose={handleClose}
          setProductDetail={setProductDetail}
        />
      </div>
    </div>
  );
}
