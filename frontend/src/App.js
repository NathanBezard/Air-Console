import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Console from "./pages/Console";
import Controller from "./pages/Controller";

function App() {
  return (
    <div
      className="app-container">
      {/*<nav>
        <Link to="/">Console</Link> | <Link to="/controller">Controller</Link>
      </nav>*/}

      <Routes>
        <Route path="/" element={<Console />} />
        <Route path="/controller" element={<Controller />} />
      </Routes>
    </div>
  );
}

export default App;
