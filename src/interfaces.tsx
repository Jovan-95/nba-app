/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactNode } from "react";

// Tipiziranje za children (PrivateRoute)
export interface PrivateRouteProps {
  children: ReactNode;
}

export interface PublicRouteProps {
  children: ReactNode;
}
