import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { OrderService } from '../servicesFolder/order.service';
import { EmailService } from '../servicesFolder/email.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
<div class="booking-container">
  <h2>Réservez Votre Service</h2>
  <ng-container *ngIf="!formVisible">
    <!-- Message convivial -->
    <div class="alert alert-info">
      <strong>Bienvenue !</strong> Veuillez entrer votre numéro de téléphone ci-dessous. Nous vérifierons si vous avez passé une commande avec nous dans le passé. Si c'est le cas, vos informations seront remplies automatiquement. Sinon, ne vous inquiétez pas, vous pouvez compléter le formulaire manuellement.
    </div>

    <!-- Champ de numéro de téléphone -->
    <div class="form-group">
      <label for="phone"> <i class="fas fa-phone"></i> Téléphone : </label>
      <input
        type="tel"
        id="phone"
        [(ngModel)]="phoneNumber"
        required
        pattern="^[0-9]{10}$"
        #phoneInput="ngModel"
      />
      <div
        *ngIf="phoneInput.invalid && (phoneInput.touched || phoneInput.dirty)"
      >
        <small *ngIf="phoneInput.errors?.['required']">Le numéro de téléphone est requis.</small>
        <small *ngIf="phoneInput.errors?.['pattern']">Le numéro de téléphone doit comporter 10 chiffres.</small>
      </div>
    </div>

    <!-- Bouton de vérification -->
    <button
      class="check-button"
      (click)="checkUser()"
      [disabled]="phoneInput.invalid"
    >
      Vérifier le numéro de téléphone
    </button>
  </ng-container>

  <form
    (ngSubmit)="onSubmit($event)"
    [formGroup]="bookingForm"
    *ngIf="formVisible"
  >
    <div class="form-group">
      <label for="name"> <i class="fas fa-user"></i> Nom : </label>
      <input type="text" id="name" formControlName="name" />
      <div
        *ngIf="
          bookingForm.get('name')?.invalid &&
          (bookingForm.get('name')?.touched || bookingForm.get('name')?.dirty)
        "
      >
        <small *ngIf="bookingForm.get('name')?.errors?.['required']">Le nom est requis.</small>
        <small *ngIf="bookingForm.get('name')?.errors?.['minlength']">Le nom doit contenir au moins 2 caractères.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="email"> <i class="fas fa-envelope"></i> Email : </label>
      <input type="email" id="email" formControlName="email" />
      <div
        *ngIf="
          bookingForm.get('email')?.invalid &&
          (bookingForm.get('email')?.touched || bookingForm.get('email')?.dirty)
        "
      >
        <small *ngIf="bookingForm.get('email')?.errors?.['required']">L'email est requis.</small>
        <small *ngIf="bookingForm.get('email')?.errors?.['email']">Veuillez entrer une adresse email valide.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="phone"> <i class="fas fa-phone"></i> Téléphone : </label>
      <input type="tel" id="phone" formControlName="phone" />
      <div
        *ngIf="
          bookingForm.get('phone')?.invalid &&
          (bookingForm.get('phone')?.touched || bookingForm.get('phone')?.dirty)
        "
      >
        <small *ngIf="bookingForm.get('phone')?.errors?.['required']">Le numéro de téléphone est requis.</small>
        <small *ngIf="bookingForm.get('phone')?.errors?.['pattern']">Le numéro de téléphone doit comporter 10 chiffres.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="address">
        <i class="fas fa-map-marker-alt"></i> Adresse :
      </label>
      <input type="text" id="address" formControlName="address" />
      <div
        *ngIf="
          bookingForm.get('address')?.invalid &&
          (bookingForm.get('address')?.touched || bookingForm.get('address')?.dirty)
        "
      >
        <small *ngIf="bookingForm.get('address')?.errors?.['required']">L'adresse est requise.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="service">
        <i class="fas fa-cogs"></i> Sélectionner un Service :
      </label>
      <select
        id="service"
        formControlName="service"
        (change)="onServiceChange($event)"
      >
        <option value="" disabled selected>Sélectionnez votre service</option>
        <option value="carWash">Service de Lavage de Voiture</option>
        <option value="homeCleaning">Service de Nettoyage à Domicile</option>
      </select>
      <div *ngIf="bookingForm.get('service')?.invalid && (bookingForm.get('service')?.touched || bookingForm.get('service')?.dirty)">
        <small *ngIf="bookingForm.get('service')?.errors?.['required']">La sélection d'un service est requise.</small>
      </div>
    </div>

    <!-- Sélection du Service de Lavage de Voiture -->
    <div *ngIf="selectedService === 'carWash'">
      <div class="form-group">
        <label for="carWashPackage">
          <i class="fas fa-car"></i> Sélectionner un Forfait de Lavage :
        </label>
        <select id="carWashPackage" formControlName="carWashPackage">
          <option value="" disabled selected>Sélectionnez un forfait</option>
          <option value="base">Lavage de Base Express Intérieur/Extérieur - 50 $</option>
          <option value="standard">Lavage Standard Intérieur/Extérieur Complet - 120 $</option>
          <option value="premium">Lavage Premium Intérieur/Extérieur Complet - 200 $</option>
        </select>
        <div *ngIf="bookingForm.get('carWashPackage')?.invalid && (bookingForm.get('carWashPackage')?.touched || bookingForm.get('carWashPackage')?.dirty)">
          <small *ngIf="bookingForm.get('carWashPackage')?.errors?.['required']">La sélection d'un forfait est requise.</small>
        </div>
      </div>

      <!-- Extras pour le Lavage de Voiture -->
      <div class="form-group">
        <label><i class="fas fa-plus-circle"></i> Sélectionner des Extras :</label>
        <div>
          <label><input type="checkbox" formControlName="traitementCeramique"> Traitement Céramique (150 $)</label><br>
        </div>
      </div>
    </div>

    <!-- Sélection du Service de Nettoyage à Domicile -->
    <div *ngIf="selectedService === 'homeCleaning'">
      <div class="form-group">
        <label for="cleaningPackage">
          <i class="fas fa-broom"></i> Sélectionner un Forfait de Nettoyage :
        </label>
        <select id="cleaningPackage" formControlName="cleaningPackage" (change)="onCleaningPackageChange($event)">
          <option value="" disabled selected>Sélectionnez un forfait</option>
          <option value="nettoyageCanape">Nettoyage Canapé / Fauteuil / Matelas</option>
          <option value="nettoyageMaison">Nettoyage de Maison</option>
          <option value="postConstruction">Forfait de Nettoyage Post-Construction</option>
        </select>
        <div *ngIf="bookingForm.get('cleaningPackage')?.invalid && (bookingForm.get('cleaningPackage')?.touched || bookingForm.get('cleaningPackage')?.dirty)">
          <small *ngIf="bookingForm.get('cleaningPackage')?.errors?.['required']">La sélection d'un forfait est requise.</small>
        </div>
      </div>

      <!-- Extras pour le Nettoyage à Domicile -->
      <div class="form-group">
        <label><i class="fas fa-plus-circle"></i> Sélectionner des Extras pour le Nettoyage à Domicile :</label>
        <div>
          <label><input type="checkbox" formControlName="c2" (change)="checkExtras()"> Canapé 2 à 4 places (50 $)</label><br>
          <label><input type="checkbox" formControlName="c5" (change)="checkExtras()"> Canapé 5 à 7 places (65 $)</label><br>
          <label><input type="checkbox" formControlName="c8" (change)="checkExtras()"> Canapé 8 places et plus (80 $)</label><br>
          <label><input type="checkbox" formControlName="fauteuil" (change)="checkExtras()"> Fauteuil (20 $)</label><br>
          <label><input type="checkbox" formControlName="matelat" (change)="checkExtras()"> Matelas (35 $)</label>
        </div>
        <div *ngIf="bookingForm.errors?.['atLeastOneExtraRequired']">
          <small style="color: red;">Au moins un extra doit être sélectionné si vous choisissez le Nettoyage Canapé.</small>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="date">
        <i class="fas fa-calendar-alt"></i> Date Préférée :
      </label>
      <input type="date" id="date" formControlName="date" [min]="today" />
      <div
        *ngIf="
          bookingForm.get('date')?.invalid &&
          (bookingForm.get('date')?.touched || bookingForm.get('date')?.dirty)
        "
      >
        <small *ngIf="bookingForm.get('date')?.errors?.['required']">La date est requise.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="time">
        <i class="fas fa-clock"></i> Heure Préférée :
      </label>
      <select id="time" formControlName="time">
        <option value="" disabled selected>Sélectionnez une heure</option>
        <option *ngFor="let hour of availableTimes" [value]="hour">
          {{ hour }}
        </option>
      </select>
      <div *ngIf="bookingForm.get('time')?.errors?.['required']">
        <small>L'heure est requise.</small>
      </div>
      <div *ngIf="bookingForm.get('time')?.errors?.['booked']">
        <small>Cet horaire est déjà réservé. Veuillez choisir une autre heure.</small>
      </div>
      <div *ngIf="userBookingError" class="error-message">
        <small>{{ userBookingError }}</small>
      </div>
    </div>

    <button
      type="submit"
      class="submit-button"
      [disabled]="isSubmitDisabled()"
    >
      Soumettre la Réservation
    </button>
  </form>
</div>
  `,
  styleUrl: './booking.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  bookingForm: FormGroup;
  order: any;
  phoneNumber: string = '';
  userNotFound: boolean = false;
  formVisible: boolean = false; // Control form visibility
  selectedService: string = '';
  hours: string[] = [
    '07:00 - 08:30',
    '09:00 - 10:30',
    '11:00 - 12:30',
    '13:00 - 14:30',
    '15:00 - 16:30',
    '17:00 - 18:30',
    '19:00 - 20:30',
  ];
  bookedTimes: { [time: string]: string[] } = {}; // Object to hold booked time slots and phone numbers
  bookedDate: any;
  today: string = '';
  availableTimes: string[] = []; // Array to hold available times
  userBookingError: string | null = null; // Add this in your class


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    private emailService:EmailService,
  ) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      service: ['', Validators.required],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      carWashPackage: [{ value: '', disabled: true }, Validators.required],
      cleaningPackage: [{ value: '', disabled: true }, Validators.required],
      traitementCeramique: [{ value: false, disabled: true }], // Car wash extra, initially disabled
      // interiorDetailing: [{ value: false, disabled: true }], // Car wash extra, initially disabled
      // engineCleaning: [{ value: false, disabled: true }], // Car wash extra, initially disabled
      c2: [false],
      c5: [false],
      c8: [false],
      fauteuil: [false],
      matelat: [false],
    });

    this.bookingForm.get('date')?.valueChanges.subscribe(() => {
      this.updateAvailableTimes();
      this.checkIfSlotBooked();
    });

    this.bookingForm.get('time')?.valueChanges.subscribe(() => {
      this.checkIfSlotBooked();
    });
  }

  ngOnInit() {
    this.getBookedTimes();
    const date = new Date();
    this.today = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  }

  onServiceChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedService = selectedValue;

    // Enable/disable packages based on selected service
    if (selectedValue === 'carWash') {
      this.bookingForm.get('carWashPackage')?.enable();
      this.bookingForm.get('cleaningPackage')?.disable();
      this.bookingForm.get('cleaningPackage')?.reset();
      this.toggleHomeCleaningExtras(false);
      this.toggleCarWashExtras(true)
    } else if (selectedValue === 'homeCleaning') {
      this.bookingForm.get('cleaningPackage')?.enable();
      this.bookingForm.get('carWashPackage')?.disable();
      this.bookingForm.get('carWashPackage')?.reset();
      this.toggleHomeCleaningExtras(true);
      this.toggleCarWashExtras(false)
    }
  }

  toggleCarWashExtras(enable: boolean) {
    if (enable) {
      this.bookingForm.get('traitementCeramique')?.enable();
      // this.bookingForm.get('interiorDetailing')?.enable();
      // this.bookingForm.get('engineCleaning')?.enable();
    } else {
      this.bookingForm.get('traitementCeramique')?.disable();
      // this.bookingForm.get('interiorDetailing')?.disable();
      // this.bookingForm.get('engineCleaning')?.disable();
    }
  }

  toggleHomeCleaningExtras(enable: boolean) {
    this.bookingForm.get('c2')?.enable({ onlySelf: enable });
    this.bookingForm.get('c5')?.enable({ onlySelf: enable });
    this.bookingForm.get('c8')?.enable({ onlySelf: enable });
    this.bookingForm.get('fauteuil')?.enable({ onlySelf: enable });
    this.bookingForm.get('matelat')?.enable({ onlySelf: enable });
  }
  onCleaningPackageChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    // Check extras only if home cleaning package is selected
    if (selectedValue === 'nettoyageCanape') {
      this.checkExtras();
    } else {
      this.bookingForm.setErrors(null);
    }
  }

  // Check if at least one extra is selected
  checkExtras() {
    const extrasSelected = this.bookingForm.value.c2 || this.bookingForm.value.c5 ||
                          this.bookingForm.value.c8 || this.bookingForm.value.fauteuil ||
                          this.bookingForm.value.matelat;

    if (!extrasSelected) {
      this.bookingForm.setErrors({ atLeastOneExtraRequired: true });
    } else {
      this.bookingForm.setErrors(null);
    }
  }


  getBookedTimes() {
    this.orderService.getPosts().subscribe({
      next: (response: any) => {
        this.order = response;
        
        // Track unique dates
        this.bookedDate = {};
        this.order.forEach((slot: any) => {
          if (!this.bookedDate[slot.date]) {
            this.bookedDate[slot.date] = [];
          }
          if (!this.bookedDate[slot.date].includes(slot.time)) {
            // Ensure uniqueness for time slots
            this.bookedDate[slot.date].push(slot.time);
          }
        });
  
        // Track unique phone numbers for each time slot
        this.bookedTimes = {};
        this.order.forEach((slot: any) => {
          if (!this.bookedTimes[slot.time]) {
            this.bookedTimes[slot.time] = [];
          }
          if (!this.bookedTimes[slot.time].includes(slot.phone)) {
            // Ensure uniqueness
            this.bookedTimes[slot.time].push(slot.phone);
          }
        });
      },
      error: (error: any) => {
        console.error('Error fetching data', error);
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.bookingForm.valid) {
      const { name, phone, service, address, email, date, time, carWashPackage, cleaningPackage, traitementCeramique, c2,c5,c8,fauteuil,matelat } =
        this.bookingForm.value;

      // Check if the user has already booked this time slot
      if (this.bookedTimes[time]?.includes(phone) && this.bookedDate[date]?.includes(time)) {
        this.userBookingError =
          'You have already booked this time slot. Please choose a different time.';
        return; // Prevent further processing
      } else {
        this.userBookingError = null; // Clear previous error
      }

      this.orderService.addPost(this.bookingForm.value);

      this.orderService
        .getUserByPhoneNumber(this.phoneNumber)
        .pipe(take(1))
        .subscribe((user) => {
          if (user.length > 0) {
            const userId = user[0].id;
            user[0].order.push('Order' + date + '_' + time);
            user[0].discount = user[0].order.length;
            this.orderService.updateDocument(userId, user[0]);
          } else {
            const user: any = {
              name: name,
              phone: phone,
              email: email,
              discount: 0,
              joined: date,
              order: [],
            };
            user.order.push('Order' + date + '_' + time);
            this.orderService.addUser(user);
          }
        });
      
      this.orderService.setBookingSubmitted(true); // Set the booking as submitted
      this.emailService.placeOrder(service,date,time,0,address,email)
      this.router.navigate(['/payment'], {
        queryParams: { name, phone, service, carWashPackage, cleaningPackage, traitementCeramique, c2, c5, c8, fauteuil, matelat },
      });
    }
  }

  checkUser() {
    this.orderService
      .getPostsByPhoneNumber(this.phoneNumber)
      .subscribe((orders) => {
        if (orders.length > 0) {
          const userData = orders[0]; // Assuming the first order belongs to the user
          this.bookingForm.patchValue({
            name: userData.name,
            email: userData.email,
            address: userData.address,
            phone: userData.phone,
          });
        } else {
          this.bookingForm.reset(); // Clear the form
        }
        this.formVisible = true; // Show the form after the check
        this.cdr.detectChanges();
      });
  }

  checkIfSlotBooked() {
    const selectedDate = this.bookingForm.get('date')?.value;
    const selectedTime = this.bookingForm.get('time')?.value;

    if (selectedDate && selectedTime) {
      const isFullyBooked =
        this.bookedDate[selectedDate]?.includes(selectedTime).length >= 3 &&
        this.bookedTimes[selectedTime]?.length >= 3; // Check if 3 unique phone numbers have booked

      if (isFullyBooked) {
        this.bookingForm.get('time')?.setErrors({ booked: true });
      } else {
        this.bookingForm.get('time')?.setErrors(null);
      }
    }
  }

  updateAvailableTimes() {
    const selectedDate = this.bookingForm.get('date')?.value;
    const currentDate = new Date();

    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      const isToday =
        selectedDateObj.toDateString() === currentDate.toDateString();

      this.availableTimes = this.hours.filter((hour) => {
        if (isToday) {
          const [startHour, endHour] = hour.split(' - ').map((h) => {
            const [time, period] = h.split(' ');
            const [hours, minutes] = time.split(':').map(Number);
            const dateObj = new Date();
            dateObj.setHours(period === 'PM' ? hours + 12 : hours, minutes);
            return dateObj;
          });

          return startHour > currentDate; // only include times that are in the future
        }
        return true; // Include all times if not today
      });
    } else {
      this.availableTimes = this.hours; // Reset available times if no date is selected
    }
  }

  isSubmitDisabled(): boolean {
    // Check if the selected service has a package chosen
    const isServiceSelected = this.bookingForm.get('service')?.value;
    const isCarWashSelected = this.selectedService === 'carWash' && this.bookingForm.get('carWashPackage')?.value;
    const isHomeCleaningSelected = this.selectedService === 'homeCleaning' && this.bookingForm.get('cleaningPackage')?.value;
    const isExtrasValid = this.selectedService !== 'homeCleaning' || this.bookingForm.valid && this.bookingForm.errors?.['atLeastOneExtraRequired'] === null;

    return this.bookingForm.invalid || !isServiceSelected || (!isCarWashSelected && !isHomeCleaningSelected) || (!isHomeCleaningSelected && !isExtrasValid);
  }
}
