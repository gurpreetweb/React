import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserObj } from "../../LocalStorage/Auth";

const ProtectedRoute = ({ path, component: Component, render }) => {
  
  return (
    <Route
      path={path}
      render={(props) => {
        if (!getUserObj()) return <Redirect to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
