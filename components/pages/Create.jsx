import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonTextarea,
  IonDatetime, IonDatetimeButton, IonModal,
  IonPopover, IonButton,
  useIonToast,
  IonButtons, IonIcon
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useState } from 'react';
import Store from '../../store';
import { getContacts, getGroups, getNotifications } from '../../store/selectors';
import { LocalNotifications } from '@capacitor/local-notifications';

const Create = () => {
  const [present] = useIonToast();

  const [createContact, setCreateContact] = useState(true);
  const tempPicContact = 'https://res.cloudinary.com/dl38nyo08/image/upload/v1669104028/QOSC/91953484-6F90-488A-8ADC-8A970BA98BD6_mckb4w.jpg'
  const tempPicGroup = 'https://res.cloudinary.com/dl38nyo08/image/upload/v1669104026/QOSC/8C15795B-BBFA-4C6E-81C3-9D24F4C3C904_v0hkko.jpg'

  const contacts = Store.useState(getContacts)
  const contactIds = contacts.length == undefined ? 0 : contacts.map((i) => i.id)

  const groups = Store.useState(getGroups)
  const groupIds = groups.length == undefined ? 0 : groups.map((i) => i.id)

  const notifications = Store.useState(getNotifications)
  const notificationIds = notifications.length == undefined ? 0 : notifications.map((i) => i.id)

  const [newContact, setNewContact] = useState({
    id: contactIds == 0 ? 999 : Math.max(...contactIds) + 1,
    picture: tempPicContact,
    name: '',
    surname: '',
    nickname: '',
    phoneNum: null,
    mail: '',
    birthday: new Date().toISOString(),
    credit: null,
    debit: null,
    dateLastSeen: new Date().toISOString(),
    placeLastSeen: '',
    dateLastContact: new Date().toISOString(),
    placeLastContact: '',
    notes: '',
    groupId: '-1'
  });

  const [newGroup, setNewGroup] = useState({
    id: groupIds == 0 ? 999 : Math.max(...groupIds) + 1,
    picture: tempPicGroup,
    name: '',
    notes: '',
    partecipants: ['-1']
  });

  const [newNotification, setNewNotification] = useState({
    id: notificationIds == 0 ? 999 : Math.max(...notificationIds) + 1,
    title: '',
    when: 0
  })

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const presentToast = (message, position) => {
    present({
      message: message,
      duration: 1500,
      position: position
    });
  };

  // New Contact
  const saveContact = () => {
    let canSave = true;
    let alreadyToast = false;

    if(newContact.name == '') {
      canSave = false
      !alreadyToast && presentToast('Inserire il Nome', 'top')
      alreadyToast = true
    }
    if(newContact.surname == '') {
      canSave = false
      !alreadyToast && presentToast('Inserire il Cognome', 'top')
      alreadyToast = true
    }
    if(newContact.nickname == '') {
      canSave = false
      !alreadyToast && presentToast('Inserire il Nickname', 'top')
      alreadyToast = true
    }
    if(newContact.phoneNum == null) {
      canSave = false
      !alreadyToast && presentToast('Inserire il Numero', 'top')
      alreadyToast = true
    }
    if(newContact.mail == '') {
      canSave = false
      !alreadyToast && presentToast('Inserire la Email', 'top')
      alreadyToast = true
    }
    if(new Date(newContact.birthday).getTime() > new Date().getTime()) {
      canSave = false
      !alreadyToast && presentToast('Inserire un compleanno valido', 'top')
      alreadyToast = true
    }
    // if(newContact.credit == null) {
    //   canSave = false
    //   !alreadyToast && presentToast('Inserire il Credito (€)', 'top')
    //   alreadyToast = true
    // }
    // if(newContact.debit == null) {
    //   canSave = false
    //   !alreadyToast && presentToast('Inserire il Debito (€)', 'top')
    //   alreadyToast = true
    // }
    if(new Date(newContact.dateLastSeen).getTime() > new Date().getTime()) {
      canSave = false
      !alreadyToast && presentToast('Inserire una data passata', 'top')
      alreadyToast = true
    }
    if(newContact.placeLastSeen == '') {
      canSave = false
      !alreadyToast && presentToast('Inserire ultimo luogo visto', 'top')
      alreadyToast = true
    }
    if(new Date(newContact.dateLastContact).getTime() > new Date().getTime()) {
      canSave = false
      !alreadyToast && presentToast('Inserire una data passata', 'top')
      alreadyToast = true
    }
    if(newContact.placeLastContact == '') {
      canSave = false
      !alreadyToast && presentToast('Inserire ultimo luogo in contatto', 'top')
      alreadyToast = true
    }
    // if(newContact.notes == '') {
    //   canSave = false
    //   !alreadyToast && presentToast('Inserire le Note', 'top')
    //   alreadyToast = true
    // }

    if(canSave) {
      contacts.push(newContact)
      let g = newContact.groupId == '-1' ? '-1' : groups.filter((g) => g.id == newContact.groupId)[0].partecipants
      if(g != '-1')
        g.push(newContact.id)
      notifications.push(newNotification)

      presentToast(createContact ? 'Contatto creato con successo!' : 'Gruppo creato con successo!', 'top')

      let name = "Nuovo contatto: " + capitalizeFirstLetter(newContact.name) + ' ' + capitalizeFirstLetter(newContact.surname)
      createPushNotification(name)

      setNewContact({
        id: 0,
        // picture: '',
        name: '',
        surname: '',
        nickname: '',
        phoneNum: null,
        mail: '',
        birthday: new Date().toISOString(),
        credit: null,
        debit: null,
        dateLastSeen: new Date().toISOString(),
        placeLastSeen: '',
        dateLastContact: new Date().toISOString(),
        placeLastContact: '',
        notes: '',
        groupId: '-1'
      })
      setNewNotification({
        id: 0,
        title: '',
        when: 0
      })
    }
  }

  // New Group
  const saveGroup = () => {
    let canSave = true;
    let alreadyToast = false;

    if(newGroup.name == '') {
      canSave = false
      !alreadyToast && presentToast('Inserire il Nome Gruppo', 'top')
      alreadyToast = true
    }
    // if(newGroup.notes == '') {
    //   canSave = false
    //   !alreadyToast && presentToast('Inserire le Note', 'top')
    //   alreadyToast = true
    // }

    if(canSave) {
      groups.push(newGroup)
      let linkedContacts = contacts.filter((f) => newGroup.partecipants.includes(f.id))
      linkedContacts.map((c) => c.groupId = newGroup.id)
      notifications.push(newNotification)

      presentToast(createContact ? 'Contatto creato con successo!' : 'Gruppo creato con successo!', 'top')

      let name = "Nuovo gruppo: " + capitalizeFirstLetter(newGroup.name)
      createPushNotification(name)

      setNewGroup({
        id: 0,
        // picture: '',
        name: '',
        notes: '',
        partecipants: ['-1']
      })
      setNewNotification({
        id: 0,
        title: '',
        when: 0
      })
    }
  }

  const switchCreateContGroup = () => {
    setCreateContact(...[!createContact]);
  }

  const createPushNotification = (name) => {
    LocalNotifications.schedule({
      notifications: [
        {
          title: "Nuova Notifica",
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
          <IonTitle>
            {createContact && <>Crea Contatto</>}
            {!createContact && <>Crea Gruppo</>}
          </IonTitle>
          <IonButtons slot="end" className='right-2'>
            <IonButton id="click-trigger">
              <IonIcon icon={addOutline} className='w-7 h-7' style={{color: 'var(--ion-color-primary)'}} />
            </IonButton>
            <IonPopover trigger="click-trigger" triggerAction="click" dismissOnSelect>
              <IonContent class="ion-padding" forceOverscroll={false}>
                <a onClick={() => switchCreateContGroup()} style={{color: 'var(--ion-color-primary)'}} className='cursor-pointer underline'>
                  {createContact && <>Crea Gruppo</>}
                  {!createContact && <>Crea Contatto</>}
                </a>
              </IonContent>
            </IonPopover>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='mt-1'>
              {createContact && <>Crea Contatto</>}
              {!createContact && <>Crea Gruppo</>}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        {createContact && <>
            <IonList>
              <IonItem>
                {/* <label className='flex'>Immagine profilo</label>
                <input type="file" /> */}
                <div className='m-2 flex items-center'>
                  <img alt="pic" src={newContact.picture} className='w-14 h-14 rounded-full' />
                  <p className='ml-2' onClick={() => document.querySelector('#uploadContactPicture').click()}>Clicca per modificare la foto</p>
                  <input 
                    id='uploadContactPicture' 
                    type="file" 
                    hidden 
                    // onChange={(e) => 
                    //   setNewContact({
                    //     ...newContact,
                    //     picture: e.target.value,
                    //   })
                    // }  
                    // value={newContact.picture}
                  />
                </div>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Nome</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="text" 
                  placeholder='Nome'
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      name: capitalizeFirstLetter(e.target.value),
                    })
                  }
                  value={newContact.name}
                  // required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Cognome</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="text" 
                  placeholder='Cognome'
                  onIonChange={(e) => {
                    setNewContact({
                      ...newContact,
                      surname: capitalizeFirstLetter(e.target.value),
                    })
                    setNewNotification({
                      ...newNotification,
                      title: 'Nuovo contatto: ' + capitalizeFirstLetter(newContact.name) + ' ' + capitalizeFirstLetter(e.target.value),
                      when: new Date().getTime()
                    })
                  }}
                  value={newContact.surname}
                  // required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Nickname</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="text" 
                  placeholder='Nickname'
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      nickname: capitalizeFirstLetter(e.target.value),
                    })
                  }
                  value={newContact.nickname}
                  // required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Telefono</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="tel" 
                  placeholder="888-888-8888"
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      phoneNum: e.target.value,
                    })
                  }
                  value={newContact.phoneNum}
                  // required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Email</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="email" 
                  placeholder="email@domain.com"
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      mail: e.target.value,
                    })
                  }
                  value={newContact.mail}
                  // required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='fixed'>Compleanno</IonLabel>
                <IonDatetimeButton className='w-full flex justify-end' datetime="datetime"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime 
                    id="datetime" 
                    presentation='date' 
                    showDefaultButtons={true}
                    onIonChange={(e) =>
                      setNewContact({
                        ...newContact,
                        birthday: e.target.value,
                      })
                    }
                    value={newContact.birthday}
                  ></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-8' position="fixed">Credito</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="number" 
                  placeholder='+ 10 €'
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      credit: e.target.value,
                    })
                  }
                  value={newContact.credit}
                  step='0.5'
                  // required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-8' position="fixed">Debito</IonLabel>
                <IonInput clearInput={true} type="number" placeholder='- 10 €'
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      debit: e.target.value,
                    })
                  }
                  value={newContact.debit}
                  step='0.5'
                  // required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='fixed'>Ultima uscita</IonLabel>
                <IonDatetimeButton className='w-full flex justify-end' datetime="datetime2"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime 
                    id="datetime2" 
                    presentation='date' 
                    showDefaultButtons={true}
                    onIonChange={(e) =>
                      setNewContact({
                        ...newContact,
                        dateLastSeen: e.target.value,
                      })
                    }
                    value={newContact.dateLastSeen}
                  ></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Dove</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="text" 
                  placeholder='Luogo'
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      placeLastSeen: capitalizeFirstLetter(e.target.value),
                    })
                  }
                  value={newContact.placeLastSeen}
                  // required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='fixed'>Ultimo Contatto</IonLabel>
                <IonDatetimeButton className='w-full flex justify-end' datetime="datetime3"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime 
                    id="datetime3" 
                    presentation='date' 
                    showDefaultButtons={true}
                    onIonChange={(e) =>
                      setNewContact({
                        ...newContact,
                        dateLastContact: e.target.value,
                      })
                    }
                    value={newContact.dateLastContact}
                  ></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Dove</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="text" 
                  placeholder='Luogo'
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      placeLastContact: capitalizeFirstLetter(e.target.value),
                    })
                  }
                  value={newContact.placeLastContact}
                  // required
                ></IonInput>
              </IonItem>
              <IonItem counter={true}>
                <IonLabel position="floating">Note</IonLabel>
                <IonTextarea 
                  rows={1} 
                  autoGrow={true} 
                  maxlength={200} 
                  placeholder='Scrivi commenti'
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      notes: capitalizeFirstLetter(e.target.value),
                    })
                  }
                  value={newContact.notes}
                ></IonTextarea>
              </IonItem>
              <IonItem>
                <IonLabel>Collega Gruppo</IonLabel>
                <IonSelect 
                  placeholder="Group"
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      groupId: e.target.value,
                    })
                  }
                  value={newContact.groupId}
                >
                  <IonSelectOption value="-1">Nessuno</IonSelectOption>
                  {groups.map((group, index) => (
                    <IonSelectOption key={index} value={group.id}>{group.name}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonButton expand="block" className='m-4 h-8' onClick={() => saveContact()}>SALVA</IonButton>
            </IonList>
          </>
        }
        {!createContact && <>
            <IonList>
              <IonItem>
                {/* <label className='flex'>Immagine profilo</label>
                <input type="file" /> */}
                <div className='m-2 flex items-center'>
                  <img alt="pic" src={newGroup.picture} className='w-14 h-14 rounded-full' />
                  <p className='ml-2' onClick={() => document.querySelector('#uploadGroupPicture').click()}>Clicca per modificare la foto</p>
                  <input 
                    id='uploadGroupPicture' 
                    type="file" 
                    hidden 
                    // onChange={(e) => 
                    //   setNewGroup({
                    //     ...newGroup,
                    //     picture: e.target.value,
                    //   })
                    // }  
                    // value={newGroup.picture}
                  />
                </div>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4'>Nome Gruppo</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="text" 
                  placeholder='Nome Gruppo'
                  onIonChange={(e) => {
                    setNewGroup({
                      ...newGroup,
                      name: capitalizeFirstLetter(e.target.value),
                    })
                    setNewNotification({
                      ...newNotification,
                      title: 'Nuovo gruppo: ' + capitalizeFirstLetter(e.target.value),
                      when: new Date().getTime()
                    })
                  }}
                  value={newGroup.name}
                  // required
                ></IonInput>
              </IonItem>
              <IonItem counter={true} className='flex flex-col'>
                <IonLabel position="fixed">Note</IonLabel>
                <div>
                  <IonTextarea 
                    autoGrow={true} 
                    maxlength={200} 
                    placeholder='Scrivi commenti'
                    onIonChange={(e) =>
                      setNewGroup({
                        ...newGroup,
                        notes: capitalizeFirstLetter(e.target.value),
                      })
                    }
                    value={newGroup.notes}
                    // required
                  ></IonTextarea>
                </div>
              </IonItem>
              <IonItem>
                <IonLabel>Collega Contatti</IonLabel>
                <IonSelect 
                  placeholder="Contatti" 
                  multiple={true}
                  onIonChange={(e) =>
                    setNewGroup({
                      ...newGroup,
                      partecipants: e.target.value,
                    })
                  }
                  value={newGroup.partecipants}
                  // required
                >
                  <IonSelectOption value="-1">Nessuno</IonSelectOption>
                  {contacts.map((contact, index) => (
                    <IonSelectOption key={index} value={contact.id}>{capitalizeFirstLetter(contact.name) + ' ' + capitalizeFirstLetter(contact.surname)}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonButton expand="block" className='m-4 h-8' onClick={() => saveGroup()}>SALVA</IonButton>
            </IonList>
          </>
        }
      </IonContent>
    </IonPage>
  );
};

export default Create;
