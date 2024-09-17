import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
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

}
