import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./components/Share/Context";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { db } from "./utils/firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>

  // </React.StrictMode>
);

reportWebVitals();

