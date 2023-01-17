import firePopUp from "./firePopUp";

export default function logOut() {
  return firePopUp(
    undefined,
    "Do you want to log out?",
    undefined,
    true,
    true,
    false,
    "Log out"
  ).then((result) => {
    if (result.isDenied) {
      firePopUp(undefined, "Logged out succesful");
    }
  });
}
