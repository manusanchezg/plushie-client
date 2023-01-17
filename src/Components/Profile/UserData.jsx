import firePopUp from "../../Hooks/firePopUp";
import { Button } from "react-bootstrap";

export default function UserData({user, api}) {
  function handleSaveChanges() {
    api.updateUserInfo().then(() => {
      firePopUp(
        "success",
        "Info updated succesfully",
        "You can change your info any time"
      ).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
  }
  return (
    <div className="input-container">
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" defaultValue={user.name || ""} />
      </div>
      <div>
        <label htmlFor="lastName">Last name: </label>
        <input type="text" id="lastName" defaultValue={user.lastName || ""} />
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
  );
}
