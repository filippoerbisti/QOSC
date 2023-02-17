/* eslint-disable no-unused-vars */
import {
  IonPage,
  IonHeader,
  IonItem,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonToggle,
  IonLabel,
  IonSelect, IonSelectOption, IonText,
  IonButtons, IonButton, IonIcon
} from '@ionic/react';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';
import { logOutOutline } from 'ionicons/icons';
import { signOut } from "next-auth/react";

const Settings = ({ session }) => {
  const settings = Store.useState(selectors.getSettings);

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="end" className='right-2'>
            <IonButton id="click-trigger" onClick={logoutClickHandler}>
              <IonIcon icon={logOutOutline} className='w-7 h-7' style={{color: 'var(--ion-color-primary)'}} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>Bentornato {session?.user.name}</IonItem>
          <IonItem>
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle
              checked={settings.enableNotifications}
              onIonChange={e => {
                setSettings({
                  ...settings,
                  enableNotifications: e.target.checked,
                });
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel>Choose Languages</IonLabel>
            <IonSelect placeholder="Language">
              <IonSelectOption value="EN">English</IonSelectOption>
              <IonSelectOption value="IT">Italiano</IonSelectOption>
              <IonSelectOption value="ES">Español</IonSelectOption>
              <IonSelectOption value="DE">Deutsch</IonSelectOption>
              <IonSelectOption value="FR">Française</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Default order by</IonLabel>
            <IonSelect placeholder="Surname A-Z">
              <IonSelectOption value="">Surname A-Z</IonSelectOption>
              <IonSelectOption value="">Name Z-A</IonSelectOption>
              <IonSelectOption value="">Surname A-Z</IonSelectOption>
              <IonSelectOption value="">Name Z-A</IonSelectOption>
              <IonSelectOption value="">Last Seen Asc</IonSelectOption>
              <IonSelectOption value="">Last Seen Desc</IonSelectOption>
              <IonSelectOption value="">Last Contact Asc</IonSelectOption>
              <IonSelectOption value="">Last Contact Desc</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
        <IonText color='medium' className='w-full text-center mb-4 bottom-0 absolute italic text-xs'>
          <pre>Versione 2.1.4</pre>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
