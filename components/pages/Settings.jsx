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
  IonReorder,
  IonReorderGroup,
  IonSelect, IonSelectOption
} from '@ionic/react';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';

const SettingEntry = ({ setting, ...props }) => (
  <IonItem routerLink={`/tabs/settings/${setting.id}`} className="list-entry">
    <IonLabel>{setting.name}</IonLabel>
    <IonReorder slot="end"></IonReorder>
  </IonItem>
);

const AllSettings = ({ onSelect }) => {
  const settings = Store.useState(selectors.getLists);

  function handleReorder(event) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  return (
    // The reorder gesture is disabled by default, enable it to drag and drop items
    <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
      {settings.map((setting, i) => (
        <SettingEntry setting={setting} key={i} />
      ))}
    </IonReorderGroup>
  );
};

const Settings = () => {
  const settings = Store.useState(selectors.getSettings);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
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
          <AllSettings />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
