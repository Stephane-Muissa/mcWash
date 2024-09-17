import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private bookingSubmitted: boolean = false; // Flag to track submission

  constructor(private firestore: AngularFirestore) { }
  
  addPost(post: any): Promise<void> {
    post['status'] = 'Pending';
    post['package'] = post.carWashPackage ? post.carWashPackage:post.cleaningPackage;
    post['orderTime'] =  new Date();
    const postRef: AngularFirestoreDocument<any> = this.firestore.collection('orders').doc(); // Create a new document reference
    post['id'] = postRef.ref.id; // Add the document ID to the post data
    return postRef.set(post); // Use set to add the document with the ID
  }

  addUser(user: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.firestore.collection('users').doc(); // Create a new document reference
    user['id'] = userRef.ref.id; // Add the document ID to the user data
    return userRef.set(user); // Use set to add the document with the ID
  }

  getPosts(): Observable<any[]> {
    return this.firestore.collection('orders').valueChanges();
  }

  getPostsByPhoneNumber(phoneNumber: string): Observable<any[]> {
    return this.firestore.collection('orders', ref => ref.where('phone', '==', phoneNumber)).valueChanges();
  }

  getUserByPhoneNumber(phoneNumber: string): Observable<any[]> {
    return this.firestore.collection('users', ref => ref.where('phone', '==', phoneNumber)).valueChanges();
  }

  updateDocument(docId: string, data: any) {
    return this.firestore.collection('users').doc(docId).update(data)
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  }
  
  setBookingSubmitted(status: boolean) {
    this.bookingSubmitted = status;
  }

  isBookingSubmitted(): boolean {
    return this.bookingSubmitted;
  }
}