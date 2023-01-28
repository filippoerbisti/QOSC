import Store from '../../store';
import * as selectors from '../../store/selectors';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonCheckbox, IonInput, IonItem, IonLabel, IonRange, IonSelect, IonSelectOption, IonToggle,
  IonDatetime, IonDatetimeButton, IonModal,
  IonPopover, IonButton
} from '@ionic/react';

const Create = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large" className='mt-1'>
              Create
              {/* <IonButton id="click-trigger">Left-Click Me</IonButton>
              <IonPopover trigger="click-trigger" triggerAction="click">
                <IonContent class="ion-padding">Hello World!</IonContent>
              </IonPopover> */}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel position="fixed">Nickname</IonLabel>
            <IonInput clearInput={true} placeholder="Nome e Cognome"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Telefono</IonLabel>
            <IonInput clearInput={true} type="tel" placeholder="888-888-8888"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Email</IonLabel>
            <IonInput clearInput={true} type="email" placeholder="email@domain.com"></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Compleanno</IonLabel>
            <IonDatetimeButton className='w-full flex justify-end' datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime" presentation='date'></IonDatetime>
            </IonModal>
          </IonItem>

          <IonItem>
            <IonLabel>Group</IonLabel>
            <IonSelect placeholder="Link Group">
              <IonSelectOption value="">Any group</IonSelectOption>
              <IonSelectOption value="nes">NES</IonSelectOption>
              <IonSelectOption value="n64">Nintendo64</IonSelectOption>
              <IonSelectOption value="ps">PlayStation</IonSelectOption>
              <IonSelectOption value="genesis">Sega Genesis</IonSelectOption>
              <IonSelectOption value="saturn">Sega Saturn</IonSelectOption>
              <IonSelectOption value="snes">SNES</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle slot="end"></IonToggle>
          </IonItem>
{/* 
          <IonItem>
            <IonLabel position="stacked">Range</IonLabel>
            <IonRange></IonRange>
          </IonItem> */}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Create;
