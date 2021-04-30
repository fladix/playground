import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonText, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import React, { useState } from 'react';
import { auth as firebaseAuth } from '../utils/firebase';
import { useAuth } from '../utils/auth';
import { Redirect } from 'react-router';

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await firebaseAuth.createUserWithEmailAndPassword(
        email, password);
      console.log('Registered credential:', credential);
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('Error:', error);
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/home" />
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen  className="ion-padding">
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
          <IonText color="danger">Registration failed</IonText>
        }
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have an account?
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
