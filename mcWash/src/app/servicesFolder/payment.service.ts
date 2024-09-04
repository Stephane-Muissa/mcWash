import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://sandbox.safaricom.co.ke'; // Use the production URL in production
  constructor(private http: HttpClient) {}
  // Method to initiate payment
  initiatePayment(phoneNumber: string, amount: number): Observable<any> {
    const url = `${this.baseUrl}/mpesa/stkpush/v1/processrequest`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAccessToken()}`,
      'Content-Type': 'application/json'
    });

    const body = {
      "BusinessShortCode": 'YOUR_SHORTCODE',
      "Password": this.getPassword(),
      "Timestamp": this.getTimestamp(),
      "TransactionType": "CustomerPayBillOnline",
      "Amount": amount,
      "PartyA": phoneNumber,
      "PartyB": 'YOUR_SHORTCODE',
      "PhoneNumber": phoneNumber,
      "CallBackURL": 'YOUR_CALLBACK_URL',
      "AccountReference": 'Payment for services',
      "TransactionDesc": 'Payment for services'
    };

    return this.http.post(url, body, { headers });
  }

  private getAccessToken(): string {
    // Logic to get access token (OAuth 2.0)
    return 'ACCESS_TOKEN'; // Replace with actual token retrieval logic
  }

  private getPassword(): string {
    // Generate password using your credentials and timestamp
    return 'GENERATED_PASSWORD'; // Replace with actual password generation logic
  }

  private getTimestamp(): string {
    const date = new Date();
    return date.toISOString().replace(/[-:]/g, '').split('.')[0]; // Format as YYYYMMDDHHMMSS
  }
}
