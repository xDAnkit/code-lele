import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { authClientId, authDomain } from "./config/app.config.js";
import MainContextProvider from "./contexts/index.context.jsx";
import Navigation from "./navigation/Navigation.Layout.jsx";
import "bootstrap/dist/css/bootstrap.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <MainContextProvider>
    <Auth0Provider
      domain={authDomain}
      clientId={authClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Navigation />
    </Auth0Provider>
  </MainContextProvider>
);
