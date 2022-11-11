import { useToast } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

export default function App() {
  window.$toast = useToast();
  return <RouterProvider router={router} />;
}
