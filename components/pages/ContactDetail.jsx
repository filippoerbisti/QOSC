import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonFab, IonFabButton, IonFabList, IonIcon
} from '@ionic/react';
import { chevronDownCircle, create, logoWhatsapp, mail, call, trash } from 'ionicons/icons';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useState } from 'react';
  
const ContactDetail = ({ }) => {
    const router = useRouter();
    const [lists, setLists] = useState(Store.useState(selectors.getContacts))

    const params = useParams();
    const { id } = params;
    const loadedList = lists.find(l => l.id == id);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
              <IonFabButton size="small">
                <IonIcon icon={chevronDownCircle}></IonIcon>
              </IonFabButton>
              <IonFabList side="bottom">
                <IonFabButton>
                  <IonIcon icon={create} onClick={() => alert('Modifica' + loadedList.name +' '+ loadedList.surname)}></IonIcon>
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
            <IonCard>
                <img alt="Silhouette of mountains" src={loadedList.image} style={{width: '100%', height: '200px'}} />
                <IonCardHeader>
                    <IonCardTitle>{capitalizeFirstLetter(loadedList.name)} {capitalizeFirstLetter(loadedList.surname)}</IonCardTitle>
                    <IonCardSubtitle>{capitalizeFirstLetter(loadedList.context)}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    {loadedList.text}
                </IonCardContent>
            </IonCard>
        </IonContent>
      </IonPage>
    );
};
  
export default ContactDetail;
  