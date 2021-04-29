import { IonRouterOutlet } from "@ionic/react";
import React from "react";
import { Route } from "react-router-dom";
import HomePage from '../pages/HomePage';

const AppAuthRoutes: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route path="/my/home" component={HomePage} exact={true} />
    </IonRouterOutlet>
  );
};

export default AppAuthRoutes;