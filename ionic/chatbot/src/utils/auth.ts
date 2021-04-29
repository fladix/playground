import React, { useState, useEffect, useContext } from 'react';
import { auth as firebaseAuth } from './firebase';

interface Auth {
  loggedIn: boolean;
  userId?: string;
}

interface AuthInit {
  loading: boolean;
  auth?: Auth;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth {
  return useContext(AuthContext);
}

  /**
   * Although we have configured useEffect to run only the very first
   * time the component is mounted (empty array as param) onAuthStateChg
   * is an observer and keeps monitoring states changes while the App
   * is running. Return is used on useEffect to allow unsubscription, 
   * although in our specific case we are using it in the App component
   * so it will never unmount (no need to unsubscribe at all) 
   */
export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({ loading: true });
  useEffect(() => {
    return firebaseAuth.onAuthStateChanged((firebaseUser) => {
      const auth = firebaseUser ?
        { loggedIn: true, userId: firebaseUser.uid } :
        { loggedIn: false };
      setAuthInit({ loading: false, auth });
    });
  }, []);
  return authInit;
}