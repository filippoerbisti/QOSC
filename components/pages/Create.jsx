import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle, IonTextarea,
  IonDatetime, IonDatetimeButton, IonModal,
  IonPopover, IonButton,
  useIonToast,
  IonButtons, IonIcon
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useState } from 'react';
import Store from '../../store';
import { getContacts, getGroups, getNotifications } from '../../store/selectors';

const Create = () => {
  const [present] = useIonToast();

  const [createContact, setCreateContact] = useState(true);
  const contacts = Store.useState(getContacts)
  const groups = Store.useState(getGroups)
  const notifications = Store.useState(getNotifications)

  const contactIds = contacts.map((i) => i.id)
  const notificationIds = notifications.map((i) => i.id)

  const [newContact, setNewContact] = useState({
    id: Math.max(...contactIds) + 1,
    // picture
    name: '',
    surname: '',
    nickname: '',
    phoneNum: null,
    mail: '',
    birthday: '',
    credit: null,
    debit: null,
    dateLastSeen: '',
    placeLastSeen: '',
    dateLastContact: '',
    placeLastContact: '',
    notes: '',
    groupId: '-1'
  });

  const [newNotification, setNewNotification] = useState({
    id: Math.max(...notificationIds) + 1,
    title: '',
    when: 0
  })

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const presentToast = (position) => {
    present({
      message: createContact ? 'Contatto creato con successo!' : 'Gruppo creato con successo!',
      duration: 1500,
      position: position
    });
  };

  const save = () => {
    contacts.push(newContact)
    // setNewNotification(...[{
    //   title: 'Nuovo contatto: ' + capitalizeFirstLetter(newContact.name) + ' ' + capitalizeFirstLetter(newContact.surname),
    //   when: now
    // }])
    presentToast('top')

    notifications.push(newNotification)
    setNewContact({
      id: 0,
      // picture
      name: '',
      surname: '',
      nickname: '',
      phoneNum: null,
      mail: '',
      birthday: '',
      credit: null,
      debit: null,
      dateLastSeen: '',
      placeLastSeen: '',
      dateLastContact: '',
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

  const switchCreateContGroup = () => {
    setCreateContact(...[!createContact]);
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
                <label className='flex'>Immagine profilo</label>
                <input type="file" />
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Nome</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="text" 
                  placeholder='Nome'
                  onIonChange={(e) => {
                    setNewContact({
                      ...newContact,
                      name: capitalizeFirstLetter(e.target.value),
                    })
                    setNewNotification({
                      ...newNotification,
                      title: 'Nuovo contatto: ' + capitalizeFirstLetter(e.target.value),
                      when: new Date().getTime()
                    })
                  }}
                  value={newContact.name}
                  required
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Cognome</IonLabel>
                <IonInput 
                  clearInput={true} 
                  type="text" 
                  placeholder='Cognome'
                  onIonChange={(e) =>
                    setNewContact({
                      ...newContact,
                      surname: capitalizeFirstLetter(e.target.value),
                    })
                  }
                  value={newContact.surname}
                  required
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
                      nickname: e.target.value,
                    })
                  }
                  value={newContact.nickname}
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                      placeLastSeen: e.target.value,
                    })
                  }
                  value={newContact.placeLastSeen}
                  required
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
                      placeLastContact: e.target.value,
                    })
                  }
                  value={newContact.placeLastContact}
                  required
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
                      notes: e.target.value,
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
              <IonItem>
                <IonLabel>Enable Notifications</IonLabel>
                <IonToggle slot="end"></IonToggle>
              </IonItem>
              <IonButton expand="block" className='m-4 h-8' onClick={() => save()}>SALVA</IonButton>
            </IonList>
          </>
        }
        {!createContact && <>
            <IonList>
              <IonItem>
                <IonLabel className='pr-4'>Nome Gruppo</IonLabel>
                <IonInput clearInput={true} type="text" placeholder='Nome Gruppo'></IonInput>
              </IonItem>
              <IonItem counter={true} className='flex flex-col'>
                <IonLabel position="fixed">Note</IonLabel>
                <div>
                  <IonTextarea autoGrow={true} maxlength={200} placeholder='Scrivi commenti'></IonTextarea>
                </div>
              </IonItem>

              <IonItem>
                <IonLabel>Collega Contatti</IonLabel>
                <IonSelect placeholder="Contatti" multiple={true}>
                  <IonSelectOption value="-1">Nessuno</IonSelectOption>
                  {contacts.map((contact, index) => (
                    <IonSelectOption key={index} value={contact.id}>{capitalizeFirstLetter(contact.name) + ' ' + capitalizeFirstLetter(contact.surname)}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Enable Notifications</IonLabel>
                <IonToggle slot="end"></IonToggle>
              </IonItem>
              <IonButton expand="block" className='m-4 h-8' onClick={() => save()}>SALVA</IonButton>
            </IonList>
          </>
        }
      </IonContent>
    </IonPage>
  );
};

export default Create;
