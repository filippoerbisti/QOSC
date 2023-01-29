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
  useIonToast
} from '@ionic/react';

const Create = () => {
  const [present] = useIonToast();

  const presentToast = (position) => {
    present({
      message: 'Contatto salvato con successo!',
      duration: 1500,
      position: position
    });
  };

  const save = () => {
    presentToast('top')
  }

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
            <IonLabel className='pr-4'>Nome</IonLabel>
            <IonInput clearInput={true} type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel className='pr-4'>Cognome</IonLabel>
            <IonInput clearInput={true} type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel className='pr-4'>Nickname</IonLabel>
            <IonInput clearInput={true} type="text"></IonInput>
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
            <IonLabel position='fixed'>Compleanno</IonLabel>
            <IonDatetimeButton className='w-full flex justify-end' datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime" presentation='date'></IonDatetime>
            </IonModal>
          </IonItem>
          <div className='flex'>
            <IonItem>
              <IonLabel className='pr-4'>Credito</IonLabel>
              <IonInput clearInput={true} type="number"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel className='pr-4'>Debito</IonLabel>
              <IonInput clearInput={true} type="number"></IonInput>
            </IonItem>
          </div>
          <IonItem>
            <IonLabel position='fixed'>Ultima uscita</IonLabel>
            <IonDatetimeButton className='w-full flex justify-end' datetime="datetime2"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime2" presentation='date'></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel className='pr-4'>Dove</IonLabel>
            <IonInput clearInput={true} type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position='fixed'>Ultimo Contatto</IonLabel>
            <IonDatetimeButton className='w-full flex justify-end' datetime="datetime3"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="datetime3" presentation='date'></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel className='pr-4'>Dove</IonLabel>
            <IonInput clearInput={true} type="text"></IonInput>
          </IonItem>
          <IonItem counter={true}>
            <IonLabel position="floating">Note</IonLabel>
            <IonTextarea autoGrow={true} maxlength={200}></IonTextarea>
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
          <IonButton expand="block" className='m-4 h-8' onClick={() => save()}>SALVA</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Create;
