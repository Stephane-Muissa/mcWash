import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { BookingComponent } from './booking/booking.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'booking', component: BookingComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
  ];

