import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

//pages
import Pool from "../pages/pool/Pool";
import Staking from "../pages/staking/Staking";
import NotFound from "../pages/Page404";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/pool" replace /> },
        { path: "pool", element: <Pool /> },
        { path: "staking", element: <Staking /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
