import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonLoading, 
  IonPage, 
  IonText, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useAuth } from '../utils/auth';
import { auth as firebaseAuth } from '../utils/firebase';

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await firebaseAuth.signInWithEmailAndPassword(email, password);
      console.log('Credential:', credential);
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('Error:', error);
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/home" />;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email}
              onIonChange={(ev) => setEmail(ev.detail.value)} 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" value={password}
              onIonChange={(ev) => setPassword(ev.detail.value)}
            />
          </IonItem>
        </IonList>
        {status.error &&
          <IonText color="danger">Invalid Credentials</IonText>
        }
        <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;