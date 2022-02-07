import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Globals } from '../global';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  cart = [];
  collectionName = 'products';
  
  constructor(
    private firestore: AngularFirestore,
    public global: Globals) { }
    
  read_students() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  read_announcement() {
    return this.firestore.collection("announcementboard").snapshotChanges();
  }
  read_faqs(){
    return this.firestore.collection("faqboard").snapshotChanges();
  }
  read_reason(){
    return this.firestore.collection("reasonboard").snapshotChanges();
  }
  getHistory(segment){
    return this.firestore.collection("Order",ref=>ref.where('userid','==',this.global.userid).where('status','==',segment)).snapshotChanges();
}
  getOrderInfo(id){
    return this.firestore.collection("Order").doc(id).valueChanges();  
  }
  addUser(mobilenumber){
    return this.firestore.collection("users").add({
      mobilenumber: mobilenumber,
      name: "",
      email: "",
      image: "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
    })
  }
  getUser(mobilenumber){
    return this.firestore.collection("users",ref=>ref.where('mobilenumber','==',mobilenumber)).snapshotChanges();
  }
  updateName(id,name){
    return this.firestore.collection("users").doc(id).update({
      name: name
    });
   }
   updateEmail(id,email){
    return this.firestore.collection("users").doc(id).update({
      email: email
    });
   }
   updateStatus(id,status){
    return this.firestore.collection("Order").doc(id).update({
      status: status
    });
   }
}
