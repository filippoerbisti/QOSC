import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonNote,
  IonLabel,
} from '@ionic/react';
import Store from '../../store';
import { getNotifications } from '../../store/selectors';
import { close } from 'ionicons/icons';
import { useState } from 'react';

const NotificationItem = ({ notification, notifications }) => {
  function removePost(notification){
    let index = notifications.indexOf(notification);

    if(index > -1){
      notifications.splice(index, 1);
    }
  }

  return (

  <IonItem>
    <IonLabel>{notification.title}</IonLabel>
    <IonNote slot="end">{notification.when}</IonNote>
    <IonButton slot="end" fill="clear" color="dark" onClick={() => removePost(notification)}>
      <IonIcon icon={close} />
    </IonButton>
  </IonItem>
  )
};

const Notifications = ({ open, onDidDismiss }) => {
  const [notifications, setNotifications] = useState(Store.useState(getNotifications))

  function removePost(i){
    console.log(i)
    notifications.splice(i, 1);
    setNotifications([...notifications]);
  }

  return (
    <IonModal isOpen={open} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifications</IonTitle>
          <IonButton slot="end" fill="clear" color="dark" onClick={onDidDismiss}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='mt-1'>Notifications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {notifications.map((notification, i) => (
            <IonItem key={i}>
              <IonLabel>{notification.title}</IonLabel>
              <IonNote slot="end">{notification.when}</IonNote>
              <IonButton slot="end" fill="clear" color="dark" onClick={() => removePost(i)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default Notifications;
