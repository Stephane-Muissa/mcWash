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
} from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrderService } from '../servicesFolder/order.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="booking-container">
      <h2>Book Your Car Wash</h2>
      <ng-container *ngIf="!formVisible">
        <!-- User-Friendly Message -->
        <div class="alert alert-info">
          <strong>Welcome!</strong> Please enter your phone number below. We’ll
          check if you’ve placed an order with us in the past. If you have, your
          details will be filled in automatically. If not, don’t worry—you can
          complete the form manually.
        </div>

        <!-- Phone Number Input -->
        <div class="form-group">
          <label for="phone"> <i class="fas fa-phone"></i> Phone: </label>
          <input
            type="tel"
            id="phone"
            [(ngModel)]="phoneNumber"
            required
            pattern="^[0-9]{10}$"
            #phoneInput="ngModel"
          />
          <div
            *ngIf="
              phoneInput.invalid && (phoneInput.touched || phoneInput.dirty)
            "
          >
            <small *ngIf="phoneInput.errors?.['required']"
              >Phone number is required.</small
            >
            <small *ngIf="phoneInput.errors?.['pattern']"
              >Phone number must be 10 digits.</small
            >
          </div>
        </div>

        <!-- Check Button -->
        <button
          class="check-button"
          (click)="checkUser()"
          [disabled]="phoneInput.invalid"
        >
          Check phone number
        </button>
      </ng-container>
      <form
        (ngSubmit)="onSubmit()"
        [formGroup]="bookingForm"
        *ngIf="formVisible"
      >
        <div class="form-group">
          <label for="name"> <i class="fas fa-user"></i> Name: </label>
          <input type="text" id="name" formControlName="name" />
          <div
            *ngIf="
              bookingForm.get('name')?.invalid &&
              (bookingForm.get('name')?.touched ||
                bookingForm.get('name')?.dirty)
            "
          >
            <small *ngIf="bookingForm.get('name')?.errors?.['required']"
              >Name is required.</small
            >
            <small *ngIf="bookingForm.get('name')?.errors?.['minlength']"
              >Name must be at least 2 characters long.</small
            >
          </div>
        </div>

        <div class="form-group">
          <label for="email"> <i class="fas fa-envelope"></i> Email: </label>
          <input type="email" id="email" formControlName="email" />
          <div
            *ngIf="
              bookingForm.get('email')?.invalid &&
              (bookingForm.get('email')?.touched ||
                bookingForm.get('email')?.dirty)
            "
          >
            <small *ngIf="bookingForm.get('email')?.errors?.['required']"
              >Email is required.</small
            >
            <small *ngIf="bookingForm.get('email')?.errors?.['email']"
              >Please enter a valid email address.</small
            >
          </div>
        </div>

        <div class="form-group">
          <label for="phone"> <i class="fas fa-phone"></i> Phone: </label>
          <input type="tel" id="phone" formControlName="phone" />
          <div
            *ngIf="
              bookingForm.get('phone')?.invalid &&
              (bookingForm.get('phone')?.touched ||
                bookingForm.get('phone')?.dirty)
            "
          >
            <small *ngIf="bookingForm.get('phone')?.errors?.['required']"
              >Phone number is required.</small
            >
            <small *ngIf="bookingForm.get('phone')?.errors?.['pattern']"
              >Phone number must be 10 digits.</small
            >
          </div>
        </div>

        <div class="form-group">
          <label for="address">
            <i class="fas fa-map-marker-alt"></i> Address:
          </label>
          <input type="text" id="address" formControlName="address" />
          <div
            *ngIf="
              bookingForm.get('address')?.invalid &&
              (bookingForm.get('address')?.touched ||
                bookingForm.get('address')?.dirty)
            "
          >
            <small *ngIf="bookingForm.get('address')?.errors?.['required']"
              >Address is required.</small
            >
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
          <div
            *ngIf="
              bookingForm.get('service')?.invalid &&
              (bookingForm.get('service')?.touched ||
                bookingForm.get('service')?.dirty)
            "
          >
            <small *ngIf="bookingForm.get('service')?.errors?.['required']"
              >Service selection is required.</small
            >
          </div>
        </div>

        <div class="form-group">
          <label for="date">
            <i class="fas fa-calendar-alt"></i> Preferred Date:
          </label>
          <input type="date" id="date" formControlName="date" [min]="today" />
          <div
            *ngIf="
              bookingForm.get('date')?.invalid &&
              (bookingForm.get('date')?.touched ||
                bookingForm.get('date')?.dirty)
            "
          >
            <small *ngIf="bookingForm.get('date')?.errors?.['required']"
              >Date is required.</small
            >
          </div>
        </div>

        <div class="form-group">
          <label for="time">
            <i class="fas fa-clock"></i> Preferred Time:
          </label>
          <select id="time" formControlName="time">
            <option value="" disabled selected>Select a time</option>
            <option
              *ngFor="let hour of availableTimes"
              [value]="hour"
            >
              {{ hour }}
            </option>
          </select>
          <div *ngIf="bookingForm.get('time')?.errors?.['required']">
            <small>Time is required.</small>
          </div>
          <div *ngIf="bookingForm.get('time')?.errors?.['booked']">
            <small
              >This time slot is already booked. Please choose another
              time.</small
            >
          </div>
        </div>

        <button
          type="submit"
          class="submit-button"
          [disabled]="bookingForm.invalid"
        >
          Submit Booking
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

  hours: string[] = [
    '07:00 - 08:30',
    '09:00 - 10:30',
    '11:00 - 12:30',
    '13:00 - 14:30',
    '15:00 - 16:30',
    '17:00 - 18:30',
    '19:00 - 20:30',
  ];
  bookedTimes: string[] = []; // Array to hold booked time slots
  bookedDate: string[] = [];
  today: string = '';
  availableTimes: string[] = []; // Array to hold available times

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) {
    this.bookingForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required],
      service: ['', Validators.required],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
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

  getBookedTimes() {
    this.orderService.getPosts().subscribe({
      next: (response: any) => {
        this.order = response;
        this.bookedTimes = this.order.map((slot: any) => slot.time);
        this.bookedDate = this.order.map((date: any) => date.date);
      },
      error: (error: any) => {
        console.error('Error fetching data', error);
      },
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const { name, phone, service, address, email, date, time} =
        this.bookingForm.value;
      this.orderService.addPost(this.bookingForm.value);
      this.router.navigate(['/payment'], {
        queryParams: { name, phone, service },
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
            service: userData.service,
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
      const isBooked =
        this.bookedDate.includes(selectedDate) &&
        this.bookedTimes.includes(selectedTime);
      if (isBooked) {
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
}
