// Import Layout
import { DefaultLayout } from "../components/Layouts";

// Import Route Pages
import Dashboard from "../pages/Dashboard";
import Rooms from "../pages/History/Rooms";
import Sensors from "../pages/History/Sensors";
import SensorHistory from "../pages/History/SensorHistory";

// Not Required Login
// layout:null --> No Layout
const publicRoutes = [
  { path: "/", component: Dashboard, layout: DefaultLayout },
  { path: "/history", component: Rooms, layout: DefaultLayout },
  { path: "/history/room", component: Sensors, layout: DefaultLayout },
  { path: "/history/room/sensor", component: SensorHistory, layout: DefaultLayout }
];

//Require Login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
