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
import Store from '../../store'
import { getContacts, getGroups } from '../../store/selectors';

const Create = () => {
  const [present] = useIonToast();

  const [createContact, setCreateContact] = useState(true);

  const groups = Store.useState(getGroups)
  const contacts = Store.useState(getContacts)

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
    presentToast('top')
  }

  const switchCreateContGroup = () => {
    setCreateContact(...[!createContact]);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {createContact && <>Crea Gruppo</>}
            {!createContact && <>Crea Contatto</>}
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
                <IonLabel className='pr-4' position="fixed">Nome</IonLabel>
                <IonInput clearInput={true} type="text" placeholder='Nome'></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Cognome</IonLabel>
                <IonInput clearInput={true} type="text" placeholder='Cognome'></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Nickname</IonLabel>
                <IonInput clearInput={true} type="text" placeholder='Nickname'></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Telefono</IonLabel>
                <IonInput clearInput={true} type="tel" placeholder="888-888-8888"></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Email</IonLabel>
                <IonInput clearInput={true} type="email" placeholder="email@domain.com"></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='fixed'>Compleanno</IonLabel>
                <IonDatetimeButton className='w-full flex justify-end' datetime="datetime"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime" presentation='date' showDefaultButtons={true}></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-8' position="fixed">Credito</IonLabel>
                <IonInput clearInput={true} type="number" placeholder='+ 10 €'></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-8' position="fixed">Debito</IonLabel>
                <IonInput clearInput={true} type="number" placeholder='- 10 €'></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='fixed'>Ultima uscita</IonLabel>
                <IonDatetimeButton className='w-full flex justify-end' datetime="datetime2"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime2" presentation='date' showDefaultButtons={true}></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Dove</IonLabel>
                <IonInput clearInput={true} type="text" placeholder='Luogo'></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='fixed'>Ultimo Contatto</IonLabel>
                <IonDatetimeButton className='w-full flex justify-end' datetime="datetime3"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime3" presentation='date' showDefaultButtons={true}></IonDatetime>
                </IonModal>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4' position="fixed">Dove</IonLabel>
                <IonInput clearInput={true} type="text" placeholder='Luogo'></IonInput>
              </IonItem>
              <IonItem counter={true} className='flex flex-col'>
                <IonLabel position="fixed" >Note</IonLabel>
                <div>
                  <IonTextarea autoGrow={true} maxlength={200} placeholder='Scrivi commenti'></IonTextarea>
                </div>
              </IonItem>
              <IonItem>
                <IonLabel>Collega Gruppo</IonLabel>
                <IonSelect placeholder="Group">
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
