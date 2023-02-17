/* eslint-disable no-unused-vars */
import Image from 'next/image';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCardHeader, IonCardTitle,
  IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption,
  useIonToast,
  IonText
} from '@ionic/react';
import { chevronDownCircle, create, trash } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useRouter } from 'next/router';
  
const GroupDetail = ({ session, contacts, groups }) => {
  const router = useRouter()
  // const groups = Store.useState(selectors.getGroups)
  const [grou, setGroups] = useState(groups)
  // const contacts = Store.useState(selectors.getContacts)
  const [onEdit, setOnEdit] = useState(true);
  const params = useParams();
  const { id } = params;
  const loadedList = groups.find(l => l.id == id);
  const partecipants = []
  var ids = contacts.map(c => c.id)
  var groupPartecipants = loadedList.partecipants.map(p => {
    if(ids.indexOf(p) > -1) return p
  })
  loadedList.partecipants.map((i) => {
    if (groupPartecipants.includes(i))
      partecipants.push(contacts.filter(contact => contact.id == i))
  })

  const [present] = useIonToast();

  const presentToast = (position) => {
    present({
      message: 'Gruppo salvato con successo!',
      duration: 1500,
      position: position
    });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const editGroup = () => {
    setOnEdit(...[false])
  }

  const deleteGroup = (id) => {
    router.back()
    setGroups([...grou.filter(group => group.id != id)]);
  }

  const save = (id) => {
    presentToast('top')
    setOnEdit(...[true])
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/home" />
          </IonButtons>
          <IonTitle>{loadedList.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {onEdit && <>
          <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
            <IonFabButton size="small">
              <IonIcon icon={chevronDownCircle}></IonIcon>
            </IonFabButton>
            <IonFabList side="bottom">
              <IonFabButton onClick={() => editGroup()}>
                <IonIcon icon={create}></IonIcon>
              </IonFabButton>
              <IonFabButton onClick={() => deleteGroup(loadedList.id)}>
                <IonIcon icon={trash}></IonIcon>
              </IonFabButton>
            </IonFabList>
          </IonFab>
          </>
        }

        {onEdit && <>
            <IonCardHeader className='flex items-center'>
              <Image 
                alt="pic" 
                width={56} //w-14
                height={56} //h-14
                src={loadedList.picture} 
                className='w-14 h-14 rounded-full' 
              />
              <div className='ml-4'>
                <IonCardTitle>{capitalizeFirstLetter(loadedList.name)}</IonCardTitle>
              </div>
            </IonCardHeader>
            <IonItem className='flex items-start'>
              <IonText className='mt-2'>Partecipanti</IonText>
              {partecipants.length == 0 && <ul className='ml-6 mt-2'><em>Nessuno</em></ul>}
              {partecipants.length > 0 &&
                <ul className='ml-6 mb-2'>
                  {partecipants.map((partecipant, index) => (
                    <IonItem key={index} routerLink={`/tabs/home/contact/${partecipant[0].id}`}>
                      - {capitalizeFirstLetter(partecipant[0].name)} {capitalizeFirstLetter(partecipant[0].surname)}
                    </IonItem>
                  ))}
                </ul>
              }
            </IonItem>
          </>
        } 

        {!onEdit && <>
          <IonItem>
            <div className='m-2 flex items-center'>
              <Image 
                alt="pic" 
                width={56} //w-14
                height={56} //h-14
                src={loadedList.picture} 
                className='w-14 h-14 rounded-full' 
              />
              <p className='ml-2' onClick={() => document.querySelector('#uploadPicture').click()}>Clicca per modificare la foto</p>
              <input id='uploadPicture' type="file" hidden  />
              {/* onChange={(e) => loadedList.picture = (e.target.files)} */}
            </div>
          </IonItem>
          <IonItem>
            <IonLabel className='pr-4'>Nome Gruppo</IonLabel>
            <IonInput clearInput={true} type="text" placeholder='Nome Gruppo' value={capitalizeFirstLetter(loadedList.name)} disabled={onEdit}></IonInput>
          </IonItem>
            <IonButton expand="block" className='m-4 h-8' onClick={() => save(loadedList.id)}>SALVA</IonButton>
          </>
        }

        {!onEdit && <>
            <IonItem>
              <IonLabel>Collega Contatti</IonLabel>
              <IonSelect placeholder="Contatti" multiple={true} value={partecipants.map((p, i) => partecipants[i][0].id)}>
                <IonSelectOption value="-1" disabled>Nessuno</IonSelectOption>
                {contacts.map((contact, index) => (
                  <IonSelectOption key={index} value={contact.id}>{capitalizeFirstLetter(contact.name) + ' ' + capitalizeFirstLetter(contact.surname)}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </>
        }
        <IonItem counter={true}>
          <IonLabel position="floating">Note</IonLabel>
          <IonTextarea autoGrow={true} maxlength={200} value={loadedList.notes.slice(0, 200)} disabled={onEdit}></IonTextarea>
        </IonItem>
        {!onEdit && 
          <IonButton expand="block" className='m-4 h-8' onClick={() => save(loadedList.id)}>SALVA</IonButton>
        }
      </IonContent>
    </IonPage>
  );
};
  
export default GroupDetail;
  