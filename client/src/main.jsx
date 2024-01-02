import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import EditorTab from "./EditorTab";
import HomePage from "./HomePage";
import { authClientId, authDomain } from "./config/app.config.js";
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
        path: "/:id",
        element: <EditorTab />,
      },
    ],
  },
]);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Auth0Provider
    domain={authDomain}
    clientId={authClientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
