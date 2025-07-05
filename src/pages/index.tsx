import { lazy } from "react";
import { useRoutes } from "react-router-dom";
const Search = lazy(() => import("./search/Search"))
const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Movies = lazy(() => import("./movies/Movies"));
const Wishlist = lazy(() => import("./wishlist/Wishlist"));
const MovieDetail = lazy(() => import("./movies/MovieDetail"));
const ActiorDetail = lazy(() => import("./movies/ActiorDetail"));

const MainRouter = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movie/:id",
          element: <MovieDetail />,
        },
        {
          path: "/person/:id",
          element: <ActiorDetail />,
        },
         {
          path: "/wishlist",
          element: <Wishlist/>,
        },
          {
          path: "/search",
          element: <Search/>,
        },
      ],
    },
  ]);
};

export default MainRouter;
