import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Morning } from "./components/Morning";
import { Movement } from "./components/Movement";
import { Profile } from "./components/Profile";
import { SolaraCircle } from "./components/SolaraCircle";
import { AnimationTest } from "./components/AnimationTest";

export const router = createBrowserRouter([
  {
    path: "/animation-test",
    Component: AnimationTest,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "morning", Component: Morning },
      { path: "movement", Component: Movement },
      { path: "solara-circle", Component: SolaraCircle },
      { path: "profile", Component: Profile },
    ],
  },
]);
