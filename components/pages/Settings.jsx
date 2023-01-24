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
  IonDatetime,
  IonButton, 
  useIonActionSheet
} from '@ionic/react';

import Store from '../../store';
import * as selectors from '../../store/selectors';
import { setSettings } from '../../store/actions';
import { Share } from '@capacitor/share';

const Settings = () => {
  const settings = Store.useState(selectors.getSettings);
  const [present] = useIonActionSheet();

  const share = async () => {
		await Share.share({
			title: 'Pippami tutto',
			text: 'Learn how diventare enormi, massa, bulk!',
			url: 'https://www.youtube.com/watch?v=zJY5y7vScjQ',
			dialogTitle: 'Share with friends'
		});
	};

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
        </IonList>
        <IonButton
          onClick={() =>
            present({
              header: 'Call to action',
              subHeader: 'Example subheader',
              buttons: [
                {
                  text: 'Delete',
                  role: 'destructive',
                  data: {
                    action: 'delete',
                  },
                  handler: () => alert('cancella to mare diocan')
                },
                {
                  text: 'Share',
                  data: {
                    action: 'share',
                  },
                  handler: () => share()
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                  data: {
                    action: 'cancel',
                  },
                },
              ],
              // onDidDismiss: ({ detail }) => setResult(detail),
            })
          }
        >
          Open
        </IonButton>
        <div className='justify-center flex items-center'>
          <IonDatetime></IonDatetime>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
