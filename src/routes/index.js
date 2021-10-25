import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";

//pages
import SwitchTabs from "../components/switchTabs/SwitchTabs";
import Pool from "../pages/pool/Pool";
import NotFound from "../pages/Page404";
import Terms from "../components/Terms";
import Farm from "../components/farm/Farm";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/v2/",
      element: <DashboardLayout />,
      children: [
        // { element: <Navigate to="/home" replace /> },
        { path: "home", element: <Pool /> },
        { path: "liquidity", element: <SwitchTabs /> },
        { path: "farm", element: <Farm /> },
        { path: "terms", element: <Terms /> },
        { path: "404", element: <NotFound /> },
        { path: "", element: <Navigate to="/v2/home" /> },
        { path: "*", element: <Navigate to="/v2/404" /> },
      ],
    },
    // { path: "/", element: <Navigate to="/v2/home" replace /> },
    // { path: "*", element: <Navigate to="/v2/404" replace /> },
  ]);
}
