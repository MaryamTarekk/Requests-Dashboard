import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./i18n";
import "./index.css";
import Providers from "./app/providers.jsx";
import { router } from "./app/router.jsx";

async function enableMocking() {
  console.log("1 - Starting MSW...");

  const { worker } = await import("./mocks/browser");

  console.log("2 - Worker imported:", worker);

  await worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
    onUnhandledRequest: "warn",
  });

  console.log("3 - MSW started successfully");
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>,
  );
});
