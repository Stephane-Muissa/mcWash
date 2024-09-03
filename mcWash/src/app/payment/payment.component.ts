import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,FormsModule
  ],
  template: `
  <div class="payment-container">
  <h2>Payment Details</h2>
  <form (ngSubmit)="onSubmit()" #paymentForm="ngForm">

  <div class="form-group">
      <label for="paymentMethod">Choose Payment Method:</label>
      <div class="payment-options">
        <label>
          <input type="radio" name="paymentMethod" value="creditCard" (change)="selectPaymentMethod('creditCard')" checked>
          Credit Card
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="paypal" (change)="selectPaymentMethod('paypal')">
          PayPal
        </label>
        <label>
          <input type="radio" name="paymentMethod" value="bankTransfer" (change)="selectPaymentMethod('bankTransfer')">
          Bank Transfer
        </label>
      </div>
    </div>
    <div class="form-group" *ngIf="selectedPaymentMethod === 'creditCard'">
      <label for="cardName">Name on Card:</label>
      <input type="text" id="cardName" name="cardName" required ngModel>
    </div>

    <div class="form-group" *ngIf="selectedPaymentMethod === 'creditCard'">
      <label for="cardNumber">Card Number:</label>
      <input type="text" id="cardNumber" name="cardNumber" required ngModel placeholder="1234 5678 9012 3456">
    </div>

    <div class="form-group" *ngIf="selectedPaymentMethod === 'creditCard'">
      <label for="expiryDate">Expiry Date:</label>
      <input type="month" id="expiryDate" name="expiryDate" required ngModel>
    </div>

    <div class="form-group" *ngIf="selectedPaymentMethod === 'creditCard'">
      <label for="cvv">CVV:</label>
      <input type="text" id="cvv" name="cvv" required ngModel placeholder="123">
    </div>

    <div class="form-group" *ngIf="selectedPaymentMethod === 'paypal'">
      <label for="paypalEmail">PayPal Email:</label>
      <input type="email" id="paypalEmail" name="paypalEmail" required ngModel placeholder="you@example.com">
    </div>

    <div class="form-group" *ngIf="selectedPaymentMethod === 'bankTransfer'">
      <label for="bankAccount">Bank Account Number:</label>
      <input type="text" id="bankAccount" name="bankAccount" required ngModel>
    </div>
    <div class="form-group">
      <label for="discount">Discount Code:</label>
      <input type="text" id="discount" name="discount" (input)="applyDiscount($event)" ngModel placeholder="Enter code (e.g., SAVE10)">
    </div>
    <div class="form-group total-display">
      <label>Total Amount:</label>
      <div class="total-amount">$100</div>
    </div>
    <button type="submit" class="submit-button">Complete Payment</button>
  </form>
  </div>`,
  styleUrl: './payment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  originalAmount = 100; // Example original amount
  discountAmount = 0;
  totalAmount = this.originalAmount - this.discountAmount;
  selectedPaymentMethod = 'creditCard'; // Default selection

  applyDiscount(event: Event) {
    const discountCode = (event.target as HTMLInputElement).value;

    // Simple discount logic
    if (discountCode === 'SAVE10') {
      this.discountAmount = 10; // Apply a $10 discount
    } else {
      this.discountAmount = 0; // No discount
    }
    
    // Update total amount
    this.totalAmount = this.originalAmount - this.discountAmount;
  }

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }

  onSubmit() {
    // Handle payment submission logic
    alert(`Payment processed successfully! Total amount: $${this.totalAmount} using ${this.selectedPaymentMethod}`);
    // You can redirect to a confirmation page or back to home
  }
 }
