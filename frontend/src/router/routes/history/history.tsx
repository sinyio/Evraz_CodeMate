import { type RouteObject } from "react-router-dom";
import { History } from "@pages/History";

export const historyRoutes: RouteObject[] = [
  {
    path: "/history",
    element: <History />,
  },
];
