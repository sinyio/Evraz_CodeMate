import { type RouteObject } from "react-router-dom";
import { NotFound } from "@components/NotFound";

export const notFoundRoute: RouteObject[] = [
  {
    path: "*",
    element: <NotFound />,
  },
];
