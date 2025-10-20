/* @refresh reload */
import { render } from "solid-js/web";
import "./index.css";
import App from "./App.tsx";
import { HopeProvider } from "@hope-ui/solid";
import { AppProvider } from "./store/index.tsx";

const root = document.getElementById("root");

render(
  () => (
    <HopeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </HopeProvider>
  ),
  root!
);
