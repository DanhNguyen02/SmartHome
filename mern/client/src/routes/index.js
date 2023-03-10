// Import Layout
import { DefaultLayout } from "../components/Layouts";

// Import Route Pages
import Dashboard from "../pages/Dashboard";

// Not Required Login
// layout:null --> No Layout
const publicRoutes = [
  { path: "/", component: Dashboard, layout: DefaultLayout },
];

//Require Login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
