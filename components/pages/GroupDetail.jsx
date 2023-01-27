import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle
} from '@ionic/react';
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
            <IonCard>
                <img alt="Silhouette of mountains" src={loadedList.image} style={{width: '100%', height: '200px'}} />
                <IonCardHeader>
                    <IonCardTitle>{loadedList.author}</IonCardTitle>
                    <IonCardSubtitle>{loadedList.title}</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                    {loadedList.text}
                </IonCardContent>

                <IonButton fill="clear" style={{float: 'right'}}>Action 1</IonButton>
            </IonCard>
        </IonContent>
      </IonPage>
    );
};
  
export default GroupDetail;
  