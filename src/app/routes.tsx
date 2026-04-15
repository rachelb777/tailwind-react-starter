import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Morning } from "./components/Morning";
import { Movement } from "./components/Movement";
import { Profile } from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "morning", Component: Morning },
      { path: "movement", Component: Movement },
      { path: "profile", Component: Profile },
    ],
  },
]);
