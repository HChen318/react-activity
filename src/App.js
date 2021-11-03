import React, { Suspense } from "react";
import Routers from "./Routers";
import { HashRouter } from "react-router-dom";
import { GlobalStyled } from "./reset-css";

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading</div>}>
        <GlobalStyled />
        <Routers />
      </Suspense>
    </HashRouter>
  );
}
