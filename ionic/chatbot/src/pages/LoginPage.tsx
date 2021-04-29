import { 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonTitle, 
  IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      </IonContent>
    </IonPage>

  );

};

export default LoginPage;