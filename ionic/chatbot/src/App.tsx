import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import AppAuthRoutes from './components/AppAuthRoutes';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/my" component={AppAuthRoutes} />
          <Route exact path="/" render={() => <Redirect to="/my/home" />} />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;