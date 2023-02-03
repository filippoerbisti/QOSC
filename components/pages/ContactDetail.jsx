import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonFab, IonFabButton, IonFabList, IonIcon, IonInput, IonItem, IonLabel,
    IonDatetimeButton, IonDatetime, IonModal, IonTextarea, IonButton, IonSelect, IonSelectOption,
    useIonToast,
    IonText
} from '@ionic/react';
import { chevronDownCircle, create, logoWhatsapp, mail, call, trash } from 'ionicons/icons';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRouter } from 'next/router';
  
const ContactDetail = ({ }) => {
  const router = useRouter()
  const contac = Store.useState(selectors.getContacts)
  const [contacts, setContacts] = useState(contac)
  const groups = Store.useState(selectors.getGroups)
  const [onEdit, setOnEdit] = useState(true);
  const params = useParams();
  const { id } = params;
  const loadedList = contac.find(l => l.id == id);
  let userGroupId = -1
  if(loadedList.groupId != -1)
    userGroupId = groups.find(group => group.id == loadedList.groupId) == undefined ? -1 : groups.find(group => group.id == loadedList.groupId)

  const [present] = useIonToast();

  const presentToast = (position) => {
    present({
      message: 'Contatto salvato con successo!',
      duration: 1500,
      position: position
    });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const editContact = () => {
    setOnEdit(...[false])
  }

  const deleteContact = (id) => {
    router.back()
    setContacts([...contac.filter(contact => contact.id != id)]);
  }

  const save = (id) => {
    presentToast('top')
    setOnEdit(...[true])
  }

  function sendWhatsapp(phoneNum) {
    window.open(`https://wa.me/${phoneNum}`)
  }

  function phoneCall(phoneNum) {
    window.open('tel:' + phoneNum)
  }

  function sendMail(mail) {
    window.open('mailto:' + mail)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" />
          </IonButtons>
          <IonTitle>{capitalizeFirstLetter(loadedList.name)} {capitalizeFirstLetter(loadedList.surname)}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {onEdit && <>
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
              <IonFabButton size="small">
                <IonIcon icon={chevronDownCircle}></IonIcon>
              </IonFabButton>
              <IonFabList side="bottom">
                <IonFabButton onClick={() => editContact()}>
                  <IonIcon icon={create}></IonIcon>
                </IonFabButton>
                <IonFabButton onClick={() => deleteContact(loadedList.id)}>
                  <IonIcon icon={trash}></IonIcon>
                </IonFabButton>
                <IonFabButton onClick={() => sendWhatsapp(loadedList.phoneNum)}>
                  <IonIcon icon={logoWhatsapp}></IonIcon>
                </IonFabButton>
                <IonFabButton onClick={() => phoneCall(loadedList.phoneNum)}>
                  <IonIcon icon={call}></IonIcon>
                </IonFabButton>
                <IonFabButton onClick={() => sendMail(loadedList.mail)}>
                  <IonIcon icon={mail}></IonIcon>
                </IonFabButton>
              </IonFabList>
            </IonFab>
          </>
        }

        {onEdit &&
          <IonCardHeader class='flex items-center'>
            <img alt="pic" src={loadedList.picture} className='w-14 h-14 rounded-full' />
            <div className='ml-4'>
              <IonCardTitle>{capitalizeFirstLetter(loadedList.name)} {capitalizeFirstLetter(loadedList.surname)}</IonCardTitle>
              <IonCardSubtitle>{capitalizeFirstLetter(loadedList.nickname)}</IonCardSubtitle>
            </div>
          </IonCardHeader>
        } 

        {!onEdit && <>
          <IonItem>
            <div className='m-2 flex items-center'>
              <img alt="pic" src={loadedList.picture} className='w-14 h-14 rounded-full' />
              <p className='ml-2' onClick={() => document.querySelector('#uploadPicture').click()}>Clicca per modificare la foto</p>
              <input id='uploadPicture' type="file" hidden  />
              {/* onChange={(e) => loadedList.picture = (e.target.files)} */}
            </div>
          </IonItem>
          <IonItem>
            <IonLabel className='pr-4' position='fixed'>Nome</IonLabel>
            <IonInput clearInput={true} type="text" placeholder='Nome' value={capitalizeFirstLetter(loadedList.name)} disabled={onEdit}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel className='pr-4' position='fixed'>Cognome</IonLabel>
            <IonInput clearInput={true} type="text" placeholder='Cognome' value={capitalizeFirstLetter(loadedList.surname)} disabled={onEdit}></IonInput>
          </IonItem>
          <IonItem>
              <IonLabel className='pr-4' position='fixed'>Nickname</IonLabel>
              <IonInput clearInput={true} type="text" placeholder='Nickname' value={capitalizeFirstLetter(loadedList.nickname)} disabled={onEdit}></IonInput>
            </IonItem>
            <IonButton expand="block" className='m-4 h-8' onClick={() => save(loadedList.id)}>SALVA</IonButton>
          </>
        }

        <IonItem>
          <IonLabel className='pr-4' position='fixed'>Telefono</IonLabel>
          <IonInput clearInput={true} type="tel" placeholder="888-888-8888" value={loadedList.phoneNum} disabled={onEdit}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel className='pr-4' position='fixed'>Email</IonLabel>
          <IonInput clearInput={true} type="email" placeholder="email@domain.com" value={loadedList.mail} disabled={onEdit}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='fixed'>Compleanno</IonLabel>
          <IonDatetimeButton className='w-full flex justify-end' datetime="datetime"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="datetime" presentation='date' showDefaultButtons={true} value={new Date(loadedList.birthday).toISOString()} disabled={onEdit}></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel className='pr-8' position='fixed'>Credito</IonLabel>
          <IonInput clearInput={true} type="number" placeholder='+ 10 €' step='0.5' value={loadedList.credit} disabled={onEdit}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel className='pr-8' position='fixed'>Debito</IonLabel>
          <IonInput clearInput={true} type="number" placeholder='- 10 €' step='0.5' value={loadedList.debit} disabled={onEdit}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='fixed' className='fixed-label-datapicker'>Ultima uscita</IonLabel>
          <IonDatetimeButton className='w-full flex justify-end' datetime="datetime2"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="datetime2" presentation='date' showDefaultButtons={true} value={new Date(loadedList.dateLastSeen).toISOString()} disabled={onEdit}></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel className='pr-4' position='fixed'>Dove</IonLabel>
          <IonInput clearInput={true} type="text" placeholder='Luogo' value={loadedList.placeLastSeen} disabled={onEdit}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='fixed' className='fixed-label-datapicker'>Ultimo Contatto</IonLabel>
          <IonDatetimeButton className='w-full flex justify-end' datetime="datetime3"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
            <IonDatetime id="datetime3" presentation='date' showDefaultButtons={true} value={new Date(loadedList.dateLastContact).toISOString()} disabled={onEdit}></IonDatetime>
          </IonModal>
        </IonItem>
        <IonItem>
          <IonLabel className='pr-4' position='fixed'>Dove</IonLabel>
          <IonInput clearInput={true} type="text" placeholder='Luogo' value={loadedList.placeLastContact} disabled={onEdit}></IonInput>
        </IonItem>
        <IonItem counter={true}>
          <IonLabel position="floating">Note</IonLabel>
          <IonTextarea rows={1} autoGrow={true} maxlength={200} placeholder='Scrivi commenti' value={loadedList.notes.slice(0, 200)} disabled={onEdit}></IonTextarea>
        </IonItem>
        {!onEdit && <>
            <IonItem>
              <IonLabel>Collega Gruppo</IonLabel>
              <IonSelect placeholder="Group" value={loadedList.groupId}>
                <IonSelectOption value="-1">Nessuno</IonSelectOption>
                {groups.map((group, index) => (
                  <IonSelectOption key={index} value={group.id}>{group.name}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </>
        }
        {onEdit && <>
            <IonItem>
              <IonLabel>Collegato al gruppo</IonLabel>
              <IonText>{userGroupId != -1 ? userGroupId.name : 'Nessuno'}</IonText>
            </IonItem>
          </>
        }
        {!onEdit && 
          <IonButton expand="block" className='m-4 h-8' onClick={() => save(loadedList.id)}>SALVA</IonButton>
        }
      </IonContent>
    </IonPage>
  );
};
  
export default ContactDetail;
  