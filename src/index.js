import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { cache, link } from "./utils/links";
// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

const client = new ApolloClient({
  link,
  cache,
  assumeImmutableResults: true,
  connectToDevTools: process.env.NODE_ENV !== "production"
});

render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
