import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore: AngularFirestore) { }
  
  getOrders(): Observable<any[]> {
    return this.firestore.collection('orders').valueChanges();
  }

  getPayments(): Observable<any[]> {
    return this.firestore.collection('payments').valueChanges();
  }

  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }

  deleteOrder(orderId: string): Observable<void> {
    return new Observable<void>(observer => {
      this.firestore.collection('orders').doc(orderId).delete()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}