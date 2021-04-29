import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import HomePage from '../pages/HomePage';
import { useAuth } from "../utils/auth";

const AppAuthRoutes: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <IonRouterOutlet>
      <Route path="/my/home" component={HomePage} exact={true} />
    </IonRouterOutlet>
  );
};

export default AppAuthRoutes;