import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";
export default function GuestRoute({ children }) {
  const { token } = useContext(UserContext);
  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
