import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../api";
import profilePic from "../assets/profile.svg";
import heart from "../assets/wishlist.svg";
import MinWishlistCard from "./MinWishlistCard";
import OrderCard from "../Order/OrderCard";
import RecentlyViewed from "./RecentlyViewed";

export default function Profile({
  handleShow,
  loginStatus,
  handleShowLogIn,
  setProductDetail,
  handleClose,
  wishlist,
  setWishlist,
}) {
  const api = new API();

  const navigate = useNavigate();
  const user = loginStatus.user || null;

  function handleSaveChanges() {
    api.updateUserInfo().then(() => {
      Swal.fire({
        title: "Info updated succesfully",
        text: "You can change your info any time",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
  }
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

  if (loginStatus.loggedIn) {
    return (
      <main className="profile">
        <div className="float-container">
          <div className="profile-container">
            <img src={profilePic} alt="" />
            <div className="info">
              <h3>{user.name + " " + user.lastName || user.username}</h3>
              <p>
                {user.birthdate.toString() ||
                  "You didn't upload your birthdate yet, what are you waiting for?"}
              </p>
            </div>
            <Button variant="outline-danger" onClick={handleLogOut}>
              Sign out
            </Button>
          </div>
          <div>
            <div className="input-container">
              <div>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" defaultValue={user.name || ""} />
              </div>
              <div>
                <label htmlFor="lastName">Last name: </label>
                <input
                  type="text"
                  id="lastName"
                  defaultValue={user.lastName || ""}
                />
              </div>
              <div>
                <label htmlFor="address">Address: </label>
                <input
                  type="text"
                  id="address"
                  defaultValue={user.shippingAddress || ""}
                />
              </div>
              <Button variant="success" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
            <div className="wishlist-container wishlist-card-container scrollbar-hidden">
              <div className="top-wishlist">
                <h3>Wishlist</h3>
                <p>More {">"}</p>
              </div>
              {wishlist && wishlist.length ? (
                wishlist.map((product, idx) => (
                  <MinWishlistCard
                    key={idx}
                    handleShowDetail={handleShow}
                    handleClose={handleClose}
                    id={product.product_id}
                    setProductDetail={setProductDetail}
                  />
                ))
              ) : (
                <>
                  <figure>
                    <img src={heart} alt="" />
                    <figcaption>You haven't saved anything yet</figcaption>
                  </figure>
                </>
              )}
            </div>
          </div>
        </div>
        <RecentlyViewed handleShow={handleShow} setWishlist={setWishlist} />
        <div className="orders scrollbar-hidden">
          <h2>My orders</h2>
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </main>
    );
  } else handleShowLogIn();
}
