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
  IonSkeletonText,
  IonThumbnail,
  IonText,
  IonBadge
} from '@ionic/react';
import Notifications from './Notifications';
import { useEffect, useRef, useState } from 'react';
import { notificationsOutline } from 'ionicons/icons';
import { getNotifications, getContacts, getGroups } from '../../store/selectors';
import * as selectors from '../../store/selectors';

const ContactCard = ({ id, name, surname, picture, nickname, phoneNum, mail }) => {
  const [present] = useIonActionSheet();
  const slidingItem = useRef(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
        // header: 'Call to action',
        buttons: [
          {
            text: 'Message',
            data: {
              action: 'message',
            },
            handler: () => window.open("sms:" + phoneNum)
          },
          {
            text: 'Email',
            data: {
              action: 'email',
            },
            handler: () => window.open("mailto:" + mail)
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

  function call() {
    close();
    window.open("tel:" + phoneNum);
  }

  function close() {
    slidingItem.current?.close();
  }

  return (
    <IonItemSliding ref={slidingItem} className='my-2'>
      <IonItemOptions side="start" onIonSwipe={() => call()}>
        <IonItemOption color="success" onClick={() => call()} expandable>Call</IonItemOption>
      </IonItemOptions>

      <IonItem routerLink={`/tabs/home/contact/${id}`}>
        <IonAvatar slot="start" className='w-14 h-14'>
          <IonImg src={picture} />
        </IonAvatar>
        <IonLabel className="py-1">
          <h2>{capitalizeFirstLetter(name)} {capitalizeFirstLetter(surname)}</h2>
          <p>{capitalizeFirstLetter(nickname)}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end" onIonSwipe={() => canDismiss()}>
        <IonItemOption onClick={() => otherActions()} expandable>Others</IonItemOption>
        <IonItemOption color="danger" onClick={() => canDismiss()} expandable>Delete</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

const GroupCard = ({ id, name, picture, partecipants }) => {
  const [present] = useIonActionSheet();
  const slidingItem = useRef(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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

  function close() {
    slidingItem.current?.close();
  }

  const contacts = Store.useState(selectors.getContacts)
  const partecipantsContact = []
  for (var i = 0; i < partecipants.length; i++) {
    partecipantsContact.push(contacts.filter(contact => contact.id == partecipants[i]))
  }

  return (
    <IonItemSliding ref={slidingItem} className='my-2'>
      <IonItem routerLink={`/tabs/home/group/${id}`}>
        <IonAvatar slot="start" className='w-14 h-14'>
          <IonImg src={picture} />
        </IonAvatar>
        <IonLabel className="py-1">
          <h2>{capitalizeFirstLetter(name)}</h2>
          <p>{partecipantsContact.map((partecipant) => (capitalizeFirstLetter(partecipant[0].name)) + ' ' + capitalizeFirstLetter(partecipant[0].surname) + ', ')}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => canDismiss()} expandable>Delete</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

const Home = () => {
  const notifications = Store.useState(getNotifications)

  const contacts = Store.useState(getContacts)
  const [filteredContacts, setFilteredContacts] = useState(Store.useState(getContacts));
  const groups = Store.useState(getGroups);
  const [filteredGroups, setFilteredGroups] = useState(Store.useState(getGroups));
  const [showNotifications, setShowNotifications] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [segment, setSegment] = useState('contacts');
  const [contactQuery, setContactQuery] = useState('');
  const [groupQuery, setGroupQuery] = useState('');

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
    if(segment == 'contacts') {
      setContactQuery(e.target.value);
      if (e.target.value != "")
        setFilteredContacts(...[contacts.filter(contact => contact.name.toLowerCase().startsWith(e.target.value.toLowerCase()))])
      else 
        setFilteredContacts(...[contacts])
    }

    if(segment == 'groups') {
      setGroupQuery(e.target.value);
      if (e.target.value != "")
        setFilteredGroups(...[groups.filter(group => group.name.toLowerCase().startsWith(e.target.value.toLowerCase()))])
      else 
        setFilteredGroups(...[groups])
    }
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
              <IonIcon icon={notificationsOutline} className='w-7 h-7' />
              {notifications.length > 0 &&
                <IonBadge>{notifications.length}</IonBadge>
              }
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen> {/*className="ion-padding"*/}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='mt-1'>Home</IonTitle>
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
            <IonSearchbar animated={true}  placeholder="Search..." value={contactQuery} onIonChange={handleChange}></IonSearchbar>
            <IonList>
              {filteredContacts.length > 0 && <>
                  {filteredContacts.map((i, index) => (
                    <ContactCard {...i} key={index} style={{width: '100%'}} />
                  ))}
                </>
              }

              {filteredContacts.length == 0 && <>
                  <IonText className='w-full block text-center my-4'>Nessun risultato per la ricerca</IonText>
                </>
              }
            </IonList>
          </>
        }

        {!loaded && segment == 'contacts' && <>
            <h3>
              <IonSkeletonText animated={true} style={{ 'width': 'auto', 'height': '38px', 'margin': '10px' }}></IonSkeletonText>
            </h3>
            <IonList>
              {filteredContacts.map((i, index) => (
                <IonItem key={index} className='my-2'>
                  <IonThumbnail slot="start" className='rounded'>
                    <IonSkeletonText animated={true}></IonSkeletonText>
                  </IonThumbnail>
                  <IonLabel className="py-1">
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
            <IonSearchbar animated={true}  placeholder="Search..." value={groupQuery} onIonChange={handleChange}></IonSearchbar>
            <IonList>
              {filteredGroups.length > 0 && <>
                  {filteredGroups.map((i, index) => (
                    <GroupCard {...i} key={index} style={{width: '100%'}} />
                  ))}
                </>
              }

              {filteredGroups.length == 0 && <>
                  <IonText className='w-full block text-center my-4'>Nessun risultato per la ricerca</IonText>
                </>
              }
            </IonList>
          </>
        }

        {!loaded && segment == 'groups' && <>
            <h3>
              <IonSkeletonText animated={true} style={{ 'width': 'auto', 'height': '38px', 'margin': '10px' }}></IonSkeletonText>
            </h3>
            <IonList>
              {filteredGroups.map((i, index) => (
                <IonItem key={index} className='my-2'>
                  <IonThumbnail slot="start">
                    <IonSkeletonText animated={true}></IonSkeletonText>
                  </IonThumbnail>
                  <IonLabel className="py-1">
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
