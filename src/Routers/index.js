import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

const SetTimeoutTest = lazy(() => import("../page/SetTimeoutTest"));
const BigTurntable = lazy(() => import("../page/BigTurntable"));

function Routers() {
  return (
    <Switch>
      <Route path="/SetTimeoutTest" component={SetTimeoutTest} />
      <Route path="/BigTurntable" component={BigTurntable} />
    </Switch>
  );
}
export default Routers;
