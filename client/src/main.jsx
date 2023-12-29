import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import EditorTab from "./EditorTab";
import HomePage from "./HomePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/code/:id",
        element: <EditorTab />,
      },
    ],
  },
]);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Auth0Provider
    domain="dev-gh7vd2ytg45l280b.us.auth0.com"
    clientId="s9hSftlUTUPedPcLx0xG5Urh186qqt3U"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
root.render(<RouterProvider router={router} />);
