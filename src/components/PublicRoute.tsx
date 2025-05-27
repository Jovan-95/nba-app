import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { PublicRouteProps } from "../interfaces";
import type { RootState } from "../redux/store";

function PublicRoute({ children }: PublicRouteProps) {
  const user = useSelector((state: RootState) => state.auth.loggedInUser);

  // Ako je korisnik logovan, preusmeri ga na home ili neku drugu stranicu
  if (user) {
    return <Navigate to="/teams" replace />;
  }

  return children;
}

export default PublicRoute;
