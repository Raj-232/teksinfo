import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Admin from "./pages/admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/admin",
    element: <Admin />
  }

]);