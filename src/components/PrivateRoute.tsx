import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { PrivateRouteProps } from "../interfaces";
import type { RootState } from "../redux/store";

function PrivateRoute({ children }: PrivateRouteProps) {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
