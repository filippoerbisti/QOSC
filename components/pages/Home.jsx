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
import { getNotifications, getContacts, getGroups, getRangeNotif } from '../../store/selectors';
import { LocalNotifications } from '@capacitor/local-notifications';

const ContactCard = ({ id, name, surname, picture, nickname, phoneNum, mail, deleteContact }) => {
  const [present] = useIonActionSheet();
  const slidingItem = useRef(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function canDismiss() {
    close();
    return new Promise((resolve, reject) => {
      present({
        header: 'Sei sicuro di eliminare ' + capitalizeFirstLetter(name) + ' ' + capitalizeFirstLetter(surname) + '?',
        buttons: [
          {
            text: 'Si',
            role: 'confirm',
            handler: () => deleteContact()
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

const GroupCard = ({ contacts, id, name, picture, partecipants, deleteGroup }) => {
  const [present] = useIonActionSheet();
  const slidingItem = useRef(null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function canDismiss() {
    close();
    return new Promise((resolve, reject) => {
      present({
        header: 'Sei sicuro di eliminare ' + capitalizeFirstLetter(name) + '?',
        buttons: [
          {
            text: 'Si',
            role: 'confirm',
            handler: () => deleteGroup()
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

  const partecipantsContact = []
  for (var i = 0; i < partecipants.length; i++) {
    if(contacts.filter(contact => contact.id == partecipants[i]).length > 0)
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
          <p>{partecipantsContact.map((partecipant, i) => i != partecipantsContact.length - 1 ? (capitalizeFirstLetter(partecipant[0].name) + ' ' + capitalizeFirstLetter(partecipant[0].surname) + ', ') : (capitalizeFirstLetter(partecipant[0].name) + ' ' + capitalizeFirstLetter(partecipant[0].surname)))}</p>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end" onIonSwipe={() => canDismiss()}>
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

  const range = Store.useState(getRangeNotif)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);

    let notificationContact = contacts.filter((c) => c.id == range[1].contactId)[0]
    let time = new Date().getTime() - new Date(notificationContact.dateLastContact).getTime() - range[1].looptime*60*60*24*1000
    let outTimeHours = (time / (1000 * 60 * 60 * 24)).toFixed(0)
    let name = 'Non contatti ' + capitalizeFirstLetter(notificationContact.name) + ' ' + capitalizeFirstLetter(notificationContact.surname) + ' da ' + outTimeHours + ' giorni oltre il limite'
    if ((new Date().getTime() - new Date(notificationContact.dateLastContact).getTime()) > (range[1].looptime*60*60*1000))
      createNotification(name)
  }, [loaded, setLoaded])

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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

  const deleteContact = (index) => {
    contacts.splice(index, 1);
    setFilteredContacts([...contacts]);
  }

  const deleteGroup = (index) => {
    groups.splice(index, 1);
    setFilteredGroups([...groups]);
    
  }

  const createNotification = (name) => {
    LocalNotifications.schedule({
      notifications: [
        {
          title: "Avviso persona da contattare",
          body: name,
          id: Math.floor(Math.random() * 6000000),
          // schedule: {
          //   at: new Date(Date.now() + 1000 * 10), // in 5 secs
          //   repeats: true
          // }
        }
      ]
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end" className='right-2'>
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} className='w-7 h-7' style={{color: 'var(--ion-color-primary)'}} />
              {notifications.length > 0 &&
                <IonBadge>{notifications.length <= 9 ? notifications.length : '9+'}</IonBadge>
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
        <Notifications notifics={notifications} open={showNotifications} onDidDismiss={() => setShowNotifications(false)} />

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
                    <ContactCard {...i} key={index} deleteContact={() => deleteContact(index)} style={{width: '100%'}} />
                  ))}
                </>
              }

              {filteredContacts.length == 0 && <>
                  <IonText color="medium" className='w-full block text-center my-4'>Nessun risultato per la ricerca</IonText>
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
                    <GroupCard {...i} key={index} contacts={contacts} deleteGroup={() => deleteGroup(index)} style={{width: '100%'}} />
                  ))}
                </>
              }

              {filteredGroups.length == 0 && <>
                  <IonText color="medium" className='w-full block text-center my-4'>Nessun risultato per la ricerca</IonText>
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
