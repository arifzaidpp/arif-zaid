import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/authContext';
import App from "./App";
import "./assets/css/app.css";
import "./App.css"

// Initialize root
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <RecoilRoot>
    <BrowserRouter>
    <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </RecoilRoot>
);
