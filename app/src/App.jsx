import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import { Routes } from "react-router-dom"

const Landing = React.lazy(() => import("./pages/landing/landing"));

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Landing}/>
      </Routes>
    </Router>
  );
};

export default App;