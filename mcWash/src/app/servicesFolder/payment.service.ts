import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient, private firestore:AngularFirestore) {}

  addPost(post: any): Promise<void> {
    const postRef: AngularFirestoreDocument<any> = this.firestore.collection('payments').doc(); // Create a new document reference
    post['id'] = postRef.ref.id; // Add the document ID to the post data
    return postRef.set(post); // Use set to add the document with the ID
  }
}
