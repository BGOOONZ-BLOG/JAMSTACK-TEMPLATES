import React from "react";
import { Router } from "@reach/router";
import Scenes from "containers/Scenes";
import AddScene from "containers/AddScene";
import NotFound from "components/common/NotFound";
import Scene from "containers/Scene";

export default () => (
  <Router>
    <Scenes path="/" component={Scenes} />
    <AddScene path="/add" component={AddScene} />
    <Scene path="/scene/:id" component={Scene} />
    <NotFound default component={NotFound} />
  </Router>
);
