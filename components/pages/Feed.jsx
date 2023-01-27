import Card from '../ui/Card'
import Store from '../../store'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonSearchbar,
  IonRefresher, 
  IonRefresherContent,
  RefresherEventDetail,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonItemOption, IonItemOptions, IonItemSliding,
  useIonActionSheet,
  IonSegment, IonSegmentButton,
  useIonAlert
} from '@ionic/react';
import Notifications from './Notifications';
import { useRef, useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import { getHomeItems, getHomeItems2 } from '../../store/selectors';
import { Share } from '@capacitor/share';

// const FeedCard = ({ title, type, text, author, authorAvatar, image }) => (
//   <Card className="my-4 mx-auto">
//     <div className="h-32 w-full relative">
//       <img className="rounded-t-xl object-cover min-w-full min-h-full max-w-full max-h-full" src={image} alt="" />
//     </div>
//     <div className="px-4 py-4 bg-white rounded-b-xl dark:bg-gray-900">
//       <h4 className="font-bold py-0 text-s text-gray-400 dark:text-gray-500 uppercase">{type}</h4>
//       <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-100">{title}</h2>
//       <p className="sm:text-sm text-s text-gray-500 mr-1 my-3 dark:text-gray-400">{text}</p>
//       <div className="flex items-center space-x-4">
//         <div className="w-10 h-10 relative">
//           <img src={authorAvatar} className="rounded-full object-cover min-w-full min-h-full max-w-full max-h-full" alt="" />
//         </div>
//         <h3 className="text-gray-500 dark:text-gray-200 m-l-8 text-sm font-medium">{author}</h3>
//       </div>
//     </div>
//   </Card>
// );

const FeedCard = ({ id, title, type, text, author, authorAvatar, image }) => {
  const [present] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const slidingItem = useRef(null);

  const share = async () => {
		await Share.share({
			title: 'Pippami tutto',
			text: 'Learn how diventare enormi, massa, bulk!',
			url: 'https://www.youtube.com/watch?v=zJY5y7vScjQ',
			dialogTitle: 'Share with friends'
		});
	};

  function canDismiss() {
    close();
    return new Promise((resolve, reject) => {
      present({
        header: 'Are you sure?',
        buttons: [
          {
            text: 'Yes',
            role: 'confirm',
            handler: () => alert('succhiamelo scemo')
          },
          {
            text: 'No',
            role: 'cancel',
          },
        ],
        onWillDismiss: (ev) => {
          if (ev.detail.role === 'confirm') {
            resolve(true);
          } else {
            reject();
          }
        },
      });
    });
  }

  function otherActions() {
    close();
    return new Promise((resolve, reject) => {
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
      });
    });
  }

  function archive() {
    close();
    return new Promise((resolve, reject) => {
      presentAlert({
        header: 'Alert',
        subHeader: 'Important message',
        message: 'This is an alert!',
        buttons: ['OK'],
      })
    });
  }

  function close() {
    slidingItem.current?.close();
  }

  return (
    <IonItemSliding ref={slidingItem}>
      <IonItemOptions side="start">
        <IonItemOption color="success" onClick={archive} expandable>Archive</IonItemOption>
      </IonItemOptions>

      <IonItem className="" routerLink={`/tabs/feed/${id}`}>
        <IonAvatar slot="start">
          <IonImg src={image} />
        </IonAvatar>
        <IonLabel>
          <h2>{author}</h2>
          <p>{title}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption onClick={otherActions} expandable>Others</IonItemOption>
        <IonItemOption color="danger" onClick={canDismiss} expandable>Delete</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

const Feed = () => {
  const homeItems = Store.useState(getHomeItems);
  const homeItems2 = Store.useState(getHomeItems2);
  const [showNotifications, setShowNotifications] = useState(false);
  const [segment, setSegment] = useState('contacts')

  function handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
    }, 2000);
  }

  function handleSwipesegment(event) {
    setSegment(event.detail.value);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Feed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSegment value={segment} swipe-gesture={true} onIonChange={handleSwipesegment}>
          <IonSegmentButton value="contacts">
            <IonLabel>Contatti</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="groups">
            <IonLabel>Gruppi</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonSearchbar animated={true}  placeholder="Search..."></IonSearchbar>
        
        {segment == 'contacts' && 
          <IonList>
            {homeItems.map((i, index) => (
              <FeedCard {...i} key={index} style={{width: '100%'}} />
            ))}
          </IonList>
        }

        {segment == 'groups' && 
          <IonList>
            {homeItems2.map((i, index) => (
              <FeedCard {...i} key={index} style={{width: '100%'}} />
            ))}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Feed;
