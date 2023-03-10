// Import Layout
import { DefaultLayout } from "../components/Layouts";

// Import Route Pages
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";

// Not Required Login
// layout:null --> No Layout
const publicRoutes = [
  { path: "/", component: Dashboard, layout: DefaultLayout },
  { path: "/history", component: History, layout: DefaultLayout }
];

//Require Login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
