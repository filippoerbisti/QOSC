# QOSC
QOSC - Quickly Organize Social Contacts


Structure:
- QOClient (Next js & TailwindCSS & Ionic)
- QOServer (Laravel App)
- Database MySQL (Heroku)

Cross platform application (using Capacitor)

![immagine](https://user-images.githubusercontent.com/80033304/200505238-64d9c18f-d5ca-4124-97e9-44150f444ff2.png)

![immagine](https://user-images.githubusercontent.com/80033304/200508462-001dba2e-bbea-4881-9751-fc94614a6208.png)

`npm run static => next build && next export `

(build in folder ./out)

`npx cap sync => to sync changes in ios & android folder`

![immagine](https://user-images.githubusercontent.com/80033304/200509557-2c998731-d4b2-4226-aa54-7fc73b08ae68.png)

`npx cap open ios => will open ./ios folder in XCode`

`npx cap open android => will open ./android folder in Android Studio`

### Build application in Android Studio

Once you use `npx cap sync` and then `npx cap open android` will open ./android folder in Android Studio
</br>
Create APK in Android Studio:
- In the Android menu, go to Build > Build Bundle(s) / APK (s) > Build APK(s).
- Android Studio will start building the APK for you. Once done, a pop-up on the bottom right will notify you of its completion. Click the ‘locate’ button in this dialog.
- The ‘locate’ button should open File Explorer with the debug folder open that contains a file called “app-debug.apk”.
- That’s it. Rename this file and share!

Output folder: 
***\android\app\build\outputs\apk\debug***
