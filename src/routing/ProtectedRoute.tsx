import { Navigate, Outlet} from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = () => {
  const { loggedInUser } = useUser();

  return loggedInUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;