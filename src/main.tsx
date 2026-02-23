import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.scss";
import { DesignToken } from "./theme/ant-design-config-provider";
import TransactionTypeManagement from "./pages/TransactionTypeManagement";
import Client from "./pages/Client";
import Transaction from "./pages/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/transaction-type-management",
    element: <TransactionTypeManagement />,
  },
  {
    path: "/client",
    element: <Client />,
  },
  {
    path: "/transaction/:type",
    element: <Transaction />,
  },
]);

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <DesignToken>
      <RouterProvider router={router} />
    </DesignToken>
  </React.StrictMode>
);
