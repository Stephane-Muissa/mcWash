import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private firestore: AngularFirestore) { }
  
  addPost(post: any) {
    return this.firestore.collection('orders').add(post);
  }

  getPosts(): Observable<any[]> {
    return this.firestore.collection('orders').valueChanges();
  }

  getPostsByPhoneNumber(phoneNumber: string): Observable<any[]> {
    return this.firestore.collection('orders', ref => ref.where('phone', '==', phoneNumber)).valueChanges();
  }
}
