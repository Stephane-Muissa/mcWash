import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule
  ],
  template: `
 <div class="booking-container">
  <h2>Book Your Car Wash</h2>
  <form (ngSubmit)="onSubmit()" [formGroup]="bookingForm">
    <div class="form-group">
      <label for="name">
        <i class="fas fa-user"></i> Name:
      </label>
      <input type="text" id="name" formControlName="name">
      <div *ngIf="bookingForm.get('name')?.invalid && (bookingForm.get('name')?.touched || bookingForm.get('name')?.dirty)">
        <small *ngIf="bookingForm.get('name')?.errors?.['required']">Name is required.</small>
        <small *ngIf="bookingForm.get('name')?.errors?.['minlength']">Name must be at least 2 characters long.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="email">
        <i class="fas fa-envelope"></i> Email:
      </label>
      <input type="email" id="email" formControlName="email">
      <div *ngIf="bookingForm.get('email')?.invalid && (bookingForm.get('email')?.touched || bookingForm.get('email')?.dirty)">
        <small *ngIf="bookingForm.get('email')?.errors?.['required']">Email is required.</small>
        <small *ngIf="bookingForm.get('email')?.errors?.['email']">Please enter a valid email address.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="phone">
        <i class="fas fa-phone"></i> Phone:
      </label>
      <input type="tel" id="phone" formControlName="phone">
      <div *ngIf="bookingForm.get('phone')?.invalid && (bookingForm.get('phone')?.touched || bookingForm.get('phone')?.dirty)">
        <small *ngIf="bookingForm.get('phone')?.errors?.['required']">Phone number is required.</small>
        <small *ngIf="bookingForm.get('phone')?.errors?.['pattern']">Phone number must be 10 digits.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="address">
        <i class="fas fa-map-marker-alt"></i> Address:
      </label>
      <input type="text" id="address" formControlName="address">
      <div *ngIf="bookingForm.get('address')?.invalid && (bookingForm.get('address')?.touched || bookingForm.get('address')?.dirty)">
        <small *ngIf="bookingForm.get('address')?.errors?.['required']">Address is required.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="service">
        <i class="fas fa-car"></i> Select Service:
      </label>
      <select id="service" formControlName="service">
        <option value="" disabled selected>Select your service</option>
        <option value="30">Basic Package</option>
        <option value="70">Standard Package</option>
        <option value="100">Premium Package</option>
      </select>
      <div *ngIf="bookingForm.get('service')?.invalid && (bookingForm.get('service')?.touched || bookingForm.get('service')?.dirty)">
        <small *ngIf="bookingForm.get('service')?.errors?.['required']">Service selection is required.</small>
      </div>
    </div>

    <div class="form-group">
      <label for="date">
        <i class="fas fa-calendar-alt"></i> Preferred Date:
      </label>
      <input type="date" id="date" formControlName="date">
      <div *ngIf="bookingForm.get('date')?.invalid && (bookingForm.get('date')?.touched || bookingForm.get('date')?.dirty)">
        <small *ngIf="bookingForm.get('date')?.errors?.['required']">Date is required.</small>
        <small *ngIf="bookingForm.get('date')?.errors?.['invalidDate']">Please select a valid date.</small>
      </div>
    </div>


    <div class="form-group">
      <label for="time">
        <i class="fas fa-clock"></i> Preferred Time:
      </label>
      <input type="time" id="time" formControlName="time">
      <div *ngIf="bookingForm.get('time')?.invalid && (bookingForm.get('time')?.touched || bookingForm.get('time')?.dirty)">
        <small *ngIf="bookingForm.get('time')?.errors?.['required']">Time is required.</small>
        <small *ngIf="bookingForm.errors?.['invalidTime']">Time must be at least 2 hours from now if the date is today.</small>
      </div>
    </div>

    <button type="submit" class="submit-button" [disabled]="bookingForm.invalid" >Submit Booking</button>
  </form>
</div>
  `,
  styleUrl: './booking.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent { 
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      service: ['', Validators.required],
      date: ['', [Validators.required, this.dateValidator]],
      time: ['', [Validators.required, this.timeValidator]],
    }, { validators: this.dateTimeValidator });
  }

  onSubmit() {
 
    if (this.bookingForm.valid) {
      const { name, phone, service } = this.bookingForm.value;
      this.router.navigate(['/payment'], { queryParams: { name, phone, service } });
    }
  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value);

    return selectedDate < today ? { 'invalidDate': true } : null;
  }

  timeValidator(control: AbstractControl): ValidationErrors | null {
    const currentTime = new Date(); // Define currentTime here
    const selectedTime = new Date();

    // Check if the control value is filled
    if (!control.value) {
      return of(null); // No time selected
    }

    const [hours, minutes] = control.value.split(':');
    selectedTime.setHours(+hours, +minutes, 0, 0);

    // Calculate the time limit (2 hours from the current time)
    // const timeLimit = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
    //     if(selectedTime < timeLimit){
    //       return { 'invalidTime': true }; // Time must be at least 2 hours from now
    //     }
    return null;
  }

  dateTimeValidator(control: AbstractControl): ValidationErrors | null {
    const currentTime = new Date(); // Define currentTime here
    const dateControl = control.get('date');
    const timeControl = control.get('time');

    if (dateControl && timeControl) {
      const selectedDate = new Date(dateControl.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // If the selected date is today, validate the time
      if (selectedDate.getTime().toString().substring(0, 6) === today.getTime().toString().substring(0, 6)) {
        const [hours, minutes] = timeControl.value.split(':');
        const selectedTime = new Date(selectedDate); // Use selected date's year, month, and day
        selectedTime.setHours(+hours, +minutes, 0, 0);
        // Check if the selected time is at least 2 hours from now
        if (selectedTime < new Date(currentTime.getTime() + 2 * 60 * 60 * 1000)) {
          return { 'invalidTime': true }; // Time must be at least 2 hours from now
        }
      }
    }

    return null; // Valid date and time
  }
}
