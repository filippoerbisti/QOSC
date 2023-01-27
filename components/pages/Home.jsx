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
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonItemOption, 
  IonItemOptions, 
  IonItemSliding,
  useIonActionSheet,
  IonSegment, 
  IonSegmentButton,
  useIonAlert,
  IonSkeletonText,
  IonThumbnail,
} from '@ionic/react';
import Notifications from './Notifications';
import { useEffect, useRef, useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import { getContacts, getGroups } from '../../store/selectors';
import { Share } from '@capacitor/share';

const ContactCard = ({ id, title, author, image }) => {
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
    <IonItemSliding ref={slidingItem} className='my-2'>
      <IonItemOptions side="start">
        <IonItemOption color="success" onClick={archive} expandable>Archive</IonItemOption>
      </IonItemOptions>

      <IonItem className="" routerLink={`/tabs/home/contact/${id}`}>
        <IonAvatar slot="start" className='w-16 h-16'>
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

const GroupCard = ({ id, title, author, authorAvatar }) => {
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

      <IonItem className="" routerLink={`/tabs/home/group/${id}`}>
        <IonAvatar slot="start">
          <IonImg src={authorAvatar} />
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

const Home = () => {
  // const contacts = Store.useState(getContacts);
  // const groups = Store.useState(getGroups);

  const [contacts, setContacts] = useState(Store.useState(getContacts));
  const [groups, setGroups] = useState(Store.useState(getGroups));
  const [showNotifications, setShowNotifications] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [segment, setSegment] = useState('contacts');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, [loaded, setLoaded])

  function handleRefresh(event) {
    setLoaded(false);
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
      setLoaded(true);
    }, 2000);
  }

  function handleSwipeSegment(event) {
    setLoaded(false);
    setSegment(event.detail.value);
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }

  //Handling the input on our search bar
  const handleChange = (e) => {
    setQuery(e.target.value);
    if(segment == 'contacts')
      // if (query != "")
        setContacts(contacts.filter(contact => contact.author.toLowerCase().startsWith(e.target.value)))
      // else
      //   setContacts(Store.useState(getContacts))

    if(segment == 'groups')
      setGroups(groups.filter(group => group.author.toLowerCase().startsWith(e.target.value)))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end" className='mr-2'>
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen> {/*className="ion-padding"*/}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Notifications open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className='mx-2'>
          <IonSegment value={segment} swipe-gesture={true} onIonChange={handleSwipeSegment}>
            <IonSegmentButton value="contacts">
              <IonLabel>Contatti</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="groups">
              <IonLabel>Gruppi</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        
        
        {loaded && segment == 'contacts' && <>
            <IonSearchbar animated={true}  placeholder="Search..." value={query} onIonChange={handleChange}></IonSearchbar>
            <IonList>
              {contacts.map((i, index) => (
                <ContactCard {...i} key={index} style={{width: '100%'}} />
              ))}
            </IonList>
          </>
        }

        {!loaded && segment == 'contacts' && <>
            <h3>
              <IonSkeletonText animated={true} style={{ 'width': '100%', 'height': '40px' }}></IonSkeletonText>
            </h3>
            <IonList>
              {contacts.map((i, index) => (
                <IonItem key={index}>
                  <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                  </IonThumbnail>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                    </h3>
                    <p>
                      <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </>
        }

        {loaded && segment == 'groups' && <>
            <IonSearchbar animated={true}  placeholder="Search..." value={query} onIonChange={handleChange}></IonSearchbar>
            <IonList>
              {groups.map((i, index) => (
                <GroupCard {...i} key={index} style={{width: '100%'}} />
              ))}
            </IonList>
          </>
        }

        {!loaded && segment == 'groups' && <>
            <h3>
              <IonSkeletonText animated={true} style={{ 'width': '100%', 'height': '40px' }}></IonSkeletonText>
            </h3>
            <IonList>
              {groups.map((i, index) => (
                <IonItem key={index}>
                  <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                  </IonThumbnail>
                  <IonLabel>
                    <h3>
                      <IonSkeletonText animated={true} style={{ 'width': '80%' }}></IonSkeletonText>
                    </h3>
                    <p>
                      <IonSkeletonText animated={true} style={{ 'width': '60%' }}></IonSkeletonText>
                    </p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </>
        }

      </IonContent>
    </IonPage>
  );
};

export default Home;
