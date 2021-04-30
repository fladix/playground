import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage'
import AppAuthRoutes from './components/AppAuthRoutes';
import { AuthContext, useAuthInit } from './utils/auth';

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }
  console.log('Rendering App with auth:', auth);
  return (
    <IonApp>
      <AuthContext.Provider value={auth}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route path="/login" component={LoginPage} exact={true} />
              <Route path="/register" component={RegisterPage} exact={true} />
              <Route path="/my" component={AppAuthRoutes} />
              <Route exact path="/" render={() => <Redirect to="/my/home" />} />
              <Route component={NotFoundPage} />
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;