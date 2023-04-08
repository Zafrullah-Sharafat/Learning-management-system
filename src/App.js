import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/style/customStyle.css";
import "./assets/style/output.css";

//Import all registered routes and views
import {
  rednerPrivateRoutesAndViews,
  rednerPublicRoutesAndViews,
} from "./appRoutes";

// Dependencies
import NotFoundError from "./components/ui/Errors/NotFoundError";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  const authChecked = useAuthCheck();
  return (
    <>
      {!authChecked ? (
        <NotFoundError message="Checking...." />
      ) : (
        <Router>
          <Routes>
            {/* Render registered private routes and views */}
            {rednerPrivateRoutesAndViews}

            {/* Render registered private routes and views */}
            {rednerPublicRoutesAndViews}
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
