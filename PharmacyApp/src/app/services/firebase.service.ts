import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'products';
  constructor(
    private firestore: AngularFirestore) { }
    
  create_student(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }
  updateProduct(id,imagePath){
    return this.firestore.collection("products").doc(id).update({
      image: imagePath
    });
  }
  read_students() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  getHistory(segment){
    return this.firestore.collection("Order",ref=>ref.where('status','==',segment)).snapshotChanges();
}
getOrderInfo(id){
  return this.firestore.collection("Order").doc(id).valueChanges();  
}
getProducts(){
  return this.firestore.collection("products").snapshotChanges();
 }
 getEmployee(){
  return this.firestore.collection("employees").snapshotChanges();
 }
 deleteProduct(id){
  return this.firestore.collection("products").doc(id).delete();
}
deleteEmployee(id){
  return this.firestore.collection("employees").doc(id).delete();
}
getProductsWithId(id){
  return this.firestore.collection("products").doc(id).snapshotChanges();
 }
 getEmployeesWithId(id){
  return this.firestore.collection("employees").doc(id).snapshotChanges();
 }
 saveEmployee(record){
   return this.firestore.collection("employees").add(record);
 }
 login(username,password){
   return this.firestore.collection("employees",ref=>ref.where('username','==',username).where('password','==',password)).snapshotChanges();
 }
 getAnnouncements(){
  return this.firestore.collection("announcementboard").snapshotChanges();
 }
 getReason(){
  return this.firestore.collection("reasonboard").snapshotChanges();
 }
 getFaq(){
  return this.firestore.collection("faqboard").snapshotChanges();
 }
 removeAnnouncement(id){
  return this.firestore.collection("announcementboard").doc(id).delete();
 }
 removeReason(id){
  return this.firestore.collection("reasonboard").doc(id).delete();
 }
 removeFaq(id){
  return this.firestore.collection("faqboard").doc(id).delete();
 }
 saveAnnouncement(image){
  return this.firestore.collection("announcementboard").add({
    image: image,
    action: 'none',
    page: ''
  })
 }
 saveReason(reason){
  return this.firestore.collection("reasonboard").add({
    reason: reason 
  })
 }
 saveFaq(question,answer){
  return this.firestore.collection("faqboard").add({
    question: question,
    answer: answer 
  })
 }
 updateName(id,name){
  return this.firestore.collection("employees").doc(id).update({
    name: name
  });
 }
 updateEmail(id,email){
  return this.firestore.collection("employees").doc(id).update({
    email: email
  });
 }
 updateMobileNumber(id,mobilenumber){
  return this.firestore.collection("employees").doc(id).update({
    mobilenumber: mobilenumber
  });
 }
 updateStatus(status,id){
  return this.firestore.collection("Order").doc(id).update({
    status: status
  });
 }
}
