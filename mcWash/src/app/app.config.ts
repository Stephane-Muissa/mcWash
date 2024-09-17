import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUuCXc6TGFi--JUZgs-lIWOhHJwkAHZDU",
  authDomain: "fmcarwash-4cfc7.firebaseapp.com",
  projectId: "fmcarwash-4cfc7",
  storageBucket: "fmcarwash-4cfc7.appspot.com",
  messagingSenderId: "995033536035",
  appId: "1:995033536035:web:5c753c854409896528c396",
  measurementId: "G-18JS680QEN"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), provideHttpClient(withFetch()),
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFireDatabase,
      AngularFirestoreModule,
      AngularFireFunctionsModule
    ]), provideAnimationsAsync(),
  ]
};
