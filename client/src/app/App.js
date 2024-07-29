import React from "react";
import Users from "./layouts/users";
import Main from "./layouts/main";
import NavBar from "./components/ui/navBar";
import { Route } from "react-router-dom";
import Login from "./layouts/login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import AppLoader from "./components/ui/hoc/AppLoader";

function App() {
  return (
    <div>
      <AppLoader>
        <NavBar />
        <Switch>
          <Route path="/login:type?" component={Login} />
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
