import OrderContainer from "../Order/OrderContainer";
import ProfileCard from "./ProfileCard";
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
  if (loginStatus.loggedIn) {
    return (
      <main className="profile">
        <ProfileCard
          setProductDetail={setProductDetail}
          handleClose={handleClose}
          wishlist={wishlist}
          loginStatus={loginStatus}
          handleShow={handleShow}
        />
        <RecentlyViewed handleShow={handleShow} setWishlist={setWishlist} />
        <OrderContainer loginStatus={loginStatus} />
      </main>
    );
  } else handleShowLogIn();
}
