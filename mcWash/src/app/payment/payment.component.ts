import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { PaymentService } from '../servicesFolder/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  template: `
  <div class="payment-container">
    <h2>Payment Details</h2>
    <form (ngSubmit)="onSubmit(paymentForm)" #paymentForm="ngForm">

      <div class="form-group">
        <label for="paymentMethod">Choose Payment Method:</label>
        <div class="payment-options">
          <label>
            <input type="radio" name="paymentMethod" value="cash" (change)="selectPaymentMethod('cash')" checked>
            Cash
          </label>
          <label>
            <input type="radio" name="paymentMethod" value="creditCard" (change)="selectPaymentMethod('creditCard')" >
            Credit Card
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

      <div class="form-group" *ngIf="selectedPaymentMethod === 'cash'">
        <label>Amount:</label>
        <input type="number" id="amount" [value]="totalAmount" disabled>
      </div>

      <div class="form-group">
        <label for="discount">Discount Code:</label>
        <input type="text" id="discount" name="discount" (input)="applyDiscount($event)" ngModel placeholder="Enter code (e.g., SAVE10)">
      </div>

      <div class="form-group total-display">
        <label>Total Amount:</label>
        <div class="total-amount">{{totalAmount | currency:'USD'}}</div>
      </div>

      <button type="submit" class="submit-button">
        {{ selectedPaymentMethod === 'cash' ? 'Complete Order' : 'Complete Payment' }}
      </button>
    </form>
  </div>`,
  styleUrls: ['./payment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
  name: string = '';
  phone: string = '';
  originalAmount: number = 0; // Example original amount
  discountAmount: number = 0;
  totalAmount: number = 0;
  selectedPaymentMethod = 'Cash'; // Default selection
  paymentResponse: any;

  constructor(private paymentService: PaymentService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params['cleaningPackage']) {
        this.originalAmount = Number(params['cleaningPackage']);
      } else {
        this.originalAmount = Number(params['carWashPackage']);
      }
      this.name = params['name'];
      this.phone = params['phone'];
    });
    this.totalAmount = this.originalAmount;
  }

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

  onSubmit(form: any) {
    console.log(form);
    alert(`Payment processed successfully! Total amount: $${this.totalAmount} using ${this.selectedPaymentMethod}`);
  }
}