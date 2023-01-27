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
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
  
const FeedDetail = ({  }) => {
    const router = useRouter();
    const [listId, setListId] = useState(router.query.all[2]);
    const lists = Store.useState(selectors.getHomeItems);

    const [loadedList, setLoadedList] = useState(lists.find(l => l.id == listId));


    // if(router.query.all[2] != undefined && typeof listId === undefined) {
    //     console.log('cc')
    //     setListId(router.query.all[2]); // router.query = tabs[0]/feed[1]/id[2]
    //     setLoadedList(lists.find(l => l.id == listId))
    // }

    // useEffect(() => {
    //     setListId();
    //     setListId(router.query.all[2]); // router.query = tabs[0]/feed[1]/id[2]
    //     console.log('vamo')
    //     // loadedList = lists.find(l => l.id == listId);
    // }, [listId, setListId, loadedList, setLoadedList])

    console.log(listId)

    return (
      <IonPage>
        {/* <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/feed" />
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
        </IonContent> */}
      </IonPage>
    );
};
  
export default FeedDetail;
  