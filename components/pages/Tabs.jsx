import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, addCircle, cog } from 'ionicons/icons';

import Home from './Home';
import ContactDetail from './ContactDetail';
import GroupDetail from './GroupDetail';
import Create from './Create';
import ListDetail from './ListDetail';
import Settings from './Settings';

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
        <Route path="/tabs/home/contact/:id" render={() => <ContactDetail />} exact={true} />
        <Route path="/tabs/home/group/:id" render={() => <GroupDetail />} exact={true} />
        <Route path="/tabs/create" render={() => <Create />} exact={true} />
        <Route path="/tabs/settings" render={() => <Settings />} exact={true} />
        <Route path="/tabs/settings/:settingId" render={() => <ListDetail />} exact={true} />
        <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="create" href="/tabs/create">
          <IonIcon icon={addCircle} />
          <IonLabel>Create</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
