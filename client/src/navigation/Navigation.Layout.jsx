import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditorTab from "../pages/Editor/Editor.Layout";
import HomePage from "../pages/Homepage/Homepage.Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <EditorTab />,
  },
]);

const Navigation = () => <RouterProvider router={router} />;

export default Navigation;
