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
import { chevronDownCircle, create, trash } from 'ionicons/icons';
import Store from '../../store';
import * as selectors from '../../store/selectors';
import { useParams } from 'react-router-dom';
  
const GroupDetail = ({ }) => {
    const lists = Store.useState(selectors.getGroups);

    const params = useParams();
    const { id } = params;
    const loadedList = lists.find(l => l.id == id);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/home" />
            </IonButtons>
            <IonTitle>{loadedList.author}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
            <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
              <IonFabButton size="small">
                <IonIcon icon={chevronDownCircle}></IonIcon>
              </IonFabButton>
              <IonFabList side="bottom">
                <IonFabButton>
                  <IonIcon icon={create}></IonIcon>
                </IonFabButton>
                <IonFabButton>
                  <IonIcon icon={trash}></IonIcon>
                </IonFabButton>
              </IonFabList>
            </IonFab>
            <IonCard>
                <img alt="Silhouette of mountains" src={loadedList.image} style={{width: '100%', height: '200px'}} />
                <IonCardHeader>
                    <IonCardTitle>{loadedList.author}</IonCardTitle>
                    <IonCardSubtitle>{loadedList.title}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    {loadedList.text}
                </IonCardContent>
            </IonCard>
        </IonContent>
      </IonPage>
    );
};
  
export default GroupDetail;
  