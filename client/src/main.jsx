import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import EditorTab from "./EditorTab";
import HomePage from "./HomePage";

const domain = import.meta.env.VITE_AUTH_DOMAIN;
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;

// console.log(domain, clientId);

console.log("vite aith domain", import.meta.env.VITE_AUTH_DOMAIN);

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
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
