import { createBrowserRouter } from "react-router-dom";
import { homeRoutes } from "./routes/home";
import { notFoundRoute } from "./routes/notFound";
import { signInRoutes } from "./routes/signIn";

export const router = createBrowserRouter([
  ...homeRoutes,
  ...notFoundRoute,
  ...signInRoutes,
]);
