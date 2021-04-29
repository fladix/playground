import { 
  IonButton,
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import React from 'react';
import { auth as firebaseAuth } from '../utils/firebase';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen  className="ion-padding">
        <IonButton color="medium" expand="block"
          onClick={() => firebaseAuth.signOut()}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
