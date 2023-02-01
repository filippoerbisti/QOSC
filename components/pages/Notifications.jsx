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
  IonText,
} from '@ionic/react';
import Store from '../../store';
import { getNotifications } from '../../store/selectors';
import { close } from 'ionicons/icons';
import { useState } from 'react';

const Notifications = ({ open, onDidDismiss }) => {
  const notifics = Store.useState(getNotifications)
  // Order by notifications
  notifics.sort(function(x, y){
    return y.when - x.when;
  })
  const [notifications, setNotifications] = useState(notifics)
  const pastTime = []

  for (var i = 0; i < notifications.length; i++) {
    let now = new Date()
    let dateNotification = new Date(notifications[i].when)
    let difference = now.getTime() - dateNotification.getTime()
    let daysDifference = Math.floor(difference/1000/60/60/24);
      difference -= daysDifference*1000*60*60*24
    let hoursDifference = Math.floor(difference/1000/60/60);
      difference -= hoursDifference*1000*60*60
    let minutesDifference = Math.floor(difference/1000/60);
      difference -= minutesDifference*1000*60
    
    if (daysDifference > 0)
      pastTime.push(daysDifference + ' days')
    else {
      if (hoursDifference > 0)
        pastTime.push(hoursDifference + ' hr')
      else {
        if (minutesDifference > 0)
          pastTime.push(minutesDifference + ' min')
        else
          pastTime.push('Just now')
      }
    }
  }

  function removePost(i){
    notifics.splice(i, 1);
    setNotifications([...notifics]);
  }

  const clearAllNotif = () => {
    notifics.splice(0, notifics.length);
    setNotifications([...notifics]);
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
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='mt-1'>Notifications</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <div className='flex flex-col'>
          {notifications.length > 0 && <>
              <IonText color="medium" className='pr-2 pt-1 text-right underline cursor-pointer' onClick={() => clearAllNotif()} style={{color: 'var(--ion-color-primary)'}}>Elimina tutte le notifiche</IonText>
            </>
          }
          {notifications.length == 0 && <>
              <IonText color="medium" className='pr-2 pt-3 text-center'>Nessuna nuova notifica</IonText>
            </>
          }
        <IonList>
          {notifications.map((notification, i) => (
            <IonItem key={i}>
              <IonLabel>{notification.title}</IonLabel>
              <IonNote slot="end">{pastTime[i]}</IonNote>
              <IonButton slot="end" fill="clear" color="dark" onClick={() => removePost(i)}>
                <IonIcon icon={close} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default Notifications;
