import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

const SetTimeoutTest = lazy(() => import("../page/SetTimeoutTest"));
const BigTurntable = lazy(() => import("../page/BigTurntable"));
// const RedEnvelopeRain = lazy(() => import("../page/RedEnvelopeRain"));


function Routers() {
  return (
    <Switch>
      <Route path="/SetTimeoutTest" component={SetTimeoutTest} />
      <Route path="/BigTurntable" component={BigTurntable} />
      {/* <Route path="/RedEnvelopeRain" component={RedEnvelopeRain} /> */}
    </Switch>
  );
}
export default Routers;
