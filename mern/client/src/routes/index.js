// Import Layout
import { DefaultLayout } from "../components/Layouts";

// Import Route Pages
import Dashboard from "../pages/Dashboard";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Profile from "../pages/User/Profile";
import History from "../pages/History";
import Rooms from "../pages/Rooms";

// Not Required Login
// layout:null --> No Layout
const publicRoutes = [
  { path: "/dashboard", component: Dashboard, layout: DefaultLayout },
  { path: "/", component: Login, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: Register, layout: null },
  { path: "/profile", component: Profile, layout: DefaultLayout },
  { path: "/history", component: History, layout: DefaultLayout },
  { path: "/rooms", component: Rooms, layout: DefaultLayout },
];

//Require Login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
