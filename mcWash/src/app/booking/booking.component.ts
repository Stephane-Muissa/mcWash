import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,FormsModule
  ],
  template: `
  <div class="booking-container">
  <h2>Book Your Car Wash</h2>
  <form (ngSubmit)="onSubmit()" #bookingForm="ngForm">
    <div class="form-group">
      <label for="name">
        <i class="fas fa-user"></i> Name:
      </label>
      <input type="text" id="name" name="name" required ngModel>
    </div>

    <div class="form-group">
      <label for="email">
        <i class="fas fa-envelope"></i> Email:
      </label>
      <input type="email" id="email" name="email" required ngModel>
    </div>

    <div class="form-group">
      <label for="phone">
        <i class="fas fa-phone"></i> Phone:
      </label>
      <input type="tel" id="phone" name="phone" required ngModel>
    </div>

    <div class="form-group">
      <label for="address">
        <i class="fas fa-map-marker-alt"></i> Address:
      </label>
      <input type="text" id="address" name="address" required ngModel>
    </div>

    <div class="form-group">
      <label for="service">
        <i class="fas fa-car"></i> Select Service:
      </label>
      <select id="service" name="service" required ngModel>
        <option value="" disabled selected>Select your service</option>
        <option value="Exterior Wash">Exterior Wash</option>
        <option value="Interior Cleaning">Interior Cleaning</option>
        <option value="Detailing">Detailing</option>
        <option value="Waxing">Waxing</option>
      </select>
    </div>

    <div class="form-group">
      <label for="date">
        <i class="fas fa-calendar-alt"></i> Preferred Date:
      </label>
      <input type="date" id="date" name="date" required ngModel>
    </div>

    <div class="form-group">
      <label for="time">
        <i class="fas fa-clock"></i> Preferred Time:
      </label>
      <input type="time" id="time" name="time" required ngModel>
    </div>

    <button type="submit" class="submit-button">Submit Booking</button>
  </form>
</div>
  `,
  styleUrl: './booking.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent { 
  onSubmit() {
    // Handle form submission logic
    alert('Booking submitted successfully!');
    // You can also log the form values or send them to a server
  }
}
