import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from "./components/home/index.js"
import Login from "./components/login/index.js"

const routeConfig = (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact></Route>
        <Route path="/index" component={Index}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </BrowserRouter>
)

export default routeConfig;