import { useToast } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DeviceAdd from "./pages/DeviceAdd";
import Login from "./pages/Login";
import Room from "./pages/Room";
import RoomAdd from "./pages/RoomAdd";
import RoomList from "./pages/RoomList";
import SignUp from "./pages/SignUp";
import SiteAdd from "./pages/SiteAdd";
import SiteList from "./pages/SiteList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/site/list",
    element: <SiteList />,
  },
  {
    path: "/site/add",
    element: <SiteAdd />,
  },
  {
    path: "/room/list",
    element: <RoomList />,
  },
  {
    path: "/room/add",
    element: <RoomAdd />,
  },
  {
    path: "/room/:roomId",
    element: <Room />,
  },
  {
    path: "/device/add",
    element: <DeviceAdd />,
  }
]);

export default function App() {
  window.$toast = useToast();
  return <RouterProvider router={router} />;
}
