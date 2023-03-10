/* eslint-disable no-unused-vars */
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { StatusBar, Style } from '@capacitor/status-bar';

import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import Tabs from './pages/Tabs';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

setupIonicReact({});

window.matchMedia("(prefers-color-scheme: dark)").addListener(async (status) => {
  try {
    await StatusBar.setStyle({
      style: status.matches ? Style.Dark : Style.Light,
    });
  } catch { /* empty */ }
});

const AppShell = ({ users, contacts, groups }) => {
  // eslint-disable-next-line no-unused-vars
  const { status, data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session, router])

  return (
    <IonApp style={{maxWidth: '500px', margin: 'auto'}}>
      <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/tabs" render={() => <Tabs session={session} contacts={contacts} groups={groups} />} />
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default AppShell;
