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
    IonDatetimeButton, IonDatetime, IonModal, IonTextarea, IonButton,
    useIonToast
} from '@ionic/react';
import { chevronDownCircle, create, logoWhatsapp, mail, call, trash } from 'ionicons/icons';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useState } from 'react';
  
const ContactDetail = ({ }) => {
    const [lists, setLists] = useState(Store.useState(selectors.getContacts))

    const [onEdit, setOnEdit] = useState(true);

    const params = useParams();
    const { id } = params;
    const loadedList = lists.find(l => l.id == id);

    const [profilePicture, setProfilePicture] = useState(loadedList.picture)


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

    const edit = () => {
      setOnEdit(...[false])
    }

    const save = () => {
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
                <IonFabButton>
                  <IonIcon icon={create} onClick={() => edit()}></IonIcon>
                </IonFabButton>
                <IonFabButton>
                  <IonIcon icon={trash} onClick={() => alert('Cancella' + loadedList.name +' '+ loadedList.surname)}></IonIcon>
                </IonFabButton>
                <IonFabButton>
                  <IonIcon icon={logoWhatsapp} onClick={() => sendWhatsapp(loadedList.phoneNum)}></IonIcon>
                </IonFabButton>
                <IonFabButton>
                  <IonIcon icon={call} onClick={() => phoneCall(loadedList.phoneNum)}></IonIcon>
                </IonFabButton>
                <IonFabButton>
                  <IonIcon icon={mail} onClick={() => sendMail(loadedList.mail)}></IonIcon>
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
              <IonItem className='flex flex-col'>
                <div className='flex flex-col items-center mb-2'>
                  <IonLabel className='pr-4'>Foto profilo</IonLabel>
                  <img alt="pic" src={profilePicture} className='w-14 h-14 rounded-full' />
                </div>
                <div className='flex flex-col mt-4 items-end justify-end'>
                  <IonInput clearInput={true} type="file" value={loadedList.picture} disabled={onEdit} onChange={() => setProfilePicture(...[e.target.value])}></IonInput>
                </div>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4'>Nome</IonLabel>
                <IonInput clearInput={true} type="text" value={capitalizeFirstLetter(loadedList.name)} disabled={onEdit}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4'>Cognome</IonLabel>
                <IonInput clearInput={true} type="text" value={capitalizeFirstLetter(loadedList.surname)} disabled={onEdit}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4'>Nickname</IonLabel>
                <IonInput clearInput={true} type="text" value={capitalizeFirstLetter(loadedList.nickname)} disabled={onEdit}></IonInput>
              </IonItem>
              <IonButton expand="block" className='m-4 h-8' onClick={() => save()}>SALVA</IonButton>
            </>
          }

          <div>
            <IonItem>
              <IonLabel className='pr-4'>Email</IonLabel>
              <IonInput clearInput={true} type="email" value={loadedList.mail} disabled={onEdit}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel className='pr-4'>Telefono</IonLabel>
              <IonInput clearInput={true} type="tel" value={loadedList.phoneNum} disabled={onEdit}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='fixed'>Compleanno</IonLabel>
              <IonDatetimeButton className='w-full flex justify-end' datetime="datetime"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime" presentation='date' value={new Date(loadedList.birthday).toISOString()} disabled={onEdit}></IonDatetime>
              </IonModal>
            </IonItem>
            <div className='flex'>
              <IonItem>
                <IonLabel className='pr-4'>Credito</IonLabel>
                <IonInput clearInput={true} type="number" value={loadedList.credit} disabled={onEdit}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel className='pr-4'>Debito</IonLabel>
                <IonInput clearInput={true} type="number" value={loadedList.debit} disabled={onEdit}></IonInput>
              </IonItem>
            </div>
            <IonItem>
              <IonLabel position='fixed'>Ultima uscita</IonLabel>
              <IonDatetimeButton className='w-full flex justify-end' datetime="datetime2"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime2" presentation='date' value={new Date(loadedList.dateLastSeen).toISOString()} disabled={onEdit}></IonDatetime>
              </IonModal>
            </IonItem>
            <IonItem>
              <IonLabel className='pr-4'>Dove</IonLabel>
              <IonInput clearInput={true} type="text" value={loadedList.placeLastSeen} disabled={onEdit}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position='fixed'>Ultimo Contatto</IonLabel>
              <IonDatetimeButton className='w-full flex justify-end' datetime="datetime3"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime3" presentation='date' value={new Date(loadedList.dateLastContact).toISOString()} disabled={onEdit}></IonDatetime>
              </IonModal>
            </IonItem>
            <IonItem>
              <IonLabel className='pr-4'>Dove</IonLabel>
              <IonInput clearInput={true} type="text" value={loadedList.placeLastContact} disabled={onEdit}></IonInput>
            </IonItem>
            <IonItem counter={true}>
              <IonLabel position="floating">Note</IonLabel>
              <IonTextarea autoGrow={true} maxlength={200} value={loadedList.text.slice(0, 200)} disabled={onEdit}></IonTextarea>
            </IonItem>
            {!onEdit && 
              <IonButton expand="block" className='m-4 h-8' onClick={() => save()}>SALVA</IonButton>
            }
          </div>
        </IonContent>
      </IonPage>
    );
};
  
export default ContactDetail;
  