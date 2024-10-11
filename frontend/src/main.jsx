import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import FilterProvider from "./contexts/filterContext.jsx";
import FilterGigsProvider from "./contexts/filterGigsContext.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FilterProvider>
          <FilterGigsProvider>
            <App />
          </FilterGigsProvider>
        </FilterProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
