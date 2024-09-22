import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../servicesFolder/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../servicesFolder/order.service';
import { take } from 'rxjs';
import * as _ from 'lodash';
import { ThankYouDialogComponent } from '../thankYouDialog/thankYouDialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
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
            <input type="radio" name="paymentMethod" value="creditCard" (change)="selectPaymentMethod('creditCard')">
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
        <input type="text" id="amount" [value]="isEstimate ? 'sur devis' : totalAmount" disabled>
      </div>

      <div class="form-group">
        <label for="discount">Discount Code:</label>
        <input type="text" id="discount" name="discount" (input)="applyDiscount($event)" ngModel placeholder="Enter code (e.g., SAVE10)">
      </div>

      <div class="form-group total-display">
        <label>Total Amount:</label>
        <div class="total-amount">{{isEstimate ? 'sur devis' : (totalAmount | currency:'USD')}}</div>
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
  originalAmount: number = 0;
  discountAmount: number = 0;
  totalAmount: number = 0;
  selectedPaymentMethod = 'Cash';
  isEstimate = false;

  // Prices for car wash packages and additional services
  private carWashPrices:any = {
    base: 50,
    standard: 120,
    premium: 200
  };

  private additionalPrices = {
    c2: 50,
    c5: 65,
    c8: 80,
    fauteuil: 20,
    matelat: 35,
    traitementCeramique: 150,
  };

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.phone = params['phone'];
      this.originalAmount = this.calculateOriginalAmount(params);
      this.totalAmount = this.originalAmount; // Initialize total amount
      this.isEstimate = this.checkIfEstimate(params['cleaningPackage']); // Check if it's an estimate
    });
  }

  private calculateOriginalAmount(params: any): number {
    let total = 0;

    // Determine the car wash package price
    const carWashPackage = params['carWashPackage'];
    if (carWashPackage) {
      total += this.carWashPrices[carWashPackage] || 0;
    }

    // Add additional services based on boolean values
    if (params['traitementCeramique'] === 'true') total += this.additionalPrices.traitementCeramique;
    if (params['c2'] === 'true') total += this.additionalPrices.c2;
    if (params['c5'] === 'true') total += this.additionalPrices.c5;
    if (params['c8'] === 'true') total += this.additionalPrices.c8;
    if (params['fauteuil'] === 'true') total += this.additionalPrices.fauteuil;
    if (params['matelat'] === 'true') total += this.additionalPrices.matelat;

    return total;
  }

  private checkIfEstimate(cleaningPackage: string): boolean {
    return cleaningPackage === 'nettoyageMaison' || cleaningPackage === 'postConstruction';
  }

  applyDiscount(event: Event) {
    const discountCode = (event.target as HTMLInputElement).value;

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
    this.orderService
      .getPostsByPhoneNumber(this.phone)
      .pipe(take(1))
      .subscribe((users) => {
        if (users.length > 0) {
          const mostRecentUser = _.orderBy(users, ['orderTime'], ['desc'])[0];
          const obj = {
            name: this.name,
            phone: this.phone,
            status: this.selectedPaymentMethod === 'Cash' ? 'Cash' : '',
            selectedPayment: this.selectedPaymentMethod,
            orderId: mostRecentUser.id,
            amount: this.originalAmount,
            discount: this.discountAmount,
            totalAmount: this.isEstimate ? 'sur devis' : this.totalAmount,
            date: mostRecentUser.date,
            paymentTime: new Date()
          };
          this.paymentService.addPost(obj);
          this.openThankYouDialog();
        } 
      });
  }

  openThankYouDialog() {
    const dialogRef = this.dialog.open(ThankYouDialogComponent, {
      width: '600px',
      panelClass: 'centered-dialog'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}