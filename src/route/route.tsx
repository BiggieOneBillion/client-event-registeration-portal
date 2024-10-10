import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { rootRoute } from "./constants";
import Root from "../layout/Root";
import NotFound from "./NotFound";
import Home from "../pages/Home";
import Welcome from "../pages/Welcome";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={rootRoute} element={<Root />} errorElement={<NotFound />}>
      <Route index element={<Welcome />} />
      <Route path="/:id" element={<Home />} />
    </Route>
  )
);

export default router;
