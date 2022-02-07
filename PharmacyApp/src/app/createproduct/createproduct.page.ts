import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Router } from "@angular/router";
interface StudentData {
  productname: string;
  price: Float32Array;
  description: string;
}
export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.page.html',
  styleUrls: ['./createproduct.page.scss'],
})
export class CreateproductPage implements OnInit {

  studentList = [];
  studentData: StudentData;
  productForm: FormGroup;
 // Upload Task 
 task: AngularFireUploadTask;

 // Progress in percentage
 percentage: Observable<number>;

 // Snapshot of uploading file
 snapshot: Observable<any>;

 // Uploaded File URL
 UploadedFileURL: Observable<string>;


 //File details  
 fileName:string;
 fileSize:number;

 //Status check 
 isUploading:boolean;
 isUploaded:boolean;
 imageFile: any;

 images: any;
 img1: any;
 imagename: any;
 imagefile: any;
 productname: string;
 productdescription: string;
 productprice: number;
 imageUrl = "";
 productprescription = false;
 private imageCollection: AngularFirestoreCollection<MyData>;
  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private storage: AngularFireStorage,
    private database: AngularFirestore,
    public loadingController: LoadingController
  ) {
    this.studentData = {} as StudentData;
    this.isUploading = false;
    this.isUploaded = false;
    
  }
  ngOnInit() {
    this.productname = "";
    this.productprice = 0.00;
    this.productdescription = "";
  }
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
        
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file.name);
    this.imagename = file.name;
    this.imagefile = fileList
  }
  async uploadFile(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    if(this.productname == ""){
      alert("Please enter a product name!");
      loading.dismiss();
    }
    else if(this.productdescription == ""){
      alert("Please select a category!");
      loading.dismiss();
    }
    else if(this.productprice == 0){
      alert("Please enter product price!");
      loading.dismiss();
    }
    else{
      if(this.productprescription == true){
        var x1 = {
          image: this.imageUrl,
          name: this.productname,
          price: +this.productprice,
          description: this.productdescription,
          prescription: true
        }
      }
      else{
        var x1 = {
          image: this.imageUrl,
          name: this.productname,
          price: +this.productprice,
          description: this.productdescription,
          prescription: false
        }
      }
      //Set document id with value in database
      this.database.collection("products").add(x1).then(resp => {
        console.log(resp);
        resp.id;
          const file = this.imagefile.item(0);
          this.fileName = file.name;
          const path = `Products/${this.productname}/${new Date().getTime()}_${file.name}`;
          const customMetadata = { app: 'Products Upload' };
          const fileRef = this.storage.ref(path);
          // this.task = this.storage.upload(path, file, { customMetadata }).then(()=>{
          this.storage.upload(path, file, { customMetadata }).then(data=>{
            data.ref.getDownloadURL().then(data2=>{
              this.imageUrl = data2;
              this.database.collection("products").doc(resp.id).update({
                image: this.imageUrl
              }).then(()=>{
                loading.dismiss();
                this.productname = "";
                this.productdescription = "";
                this.productprice = 0;
                
                this.router.navigate(["tabs/tab1"]);
              }).catch(error=>{
                alert(error);
              })
              
            })
          }).catch(error=>{
            alert(error);
          });
      }).catch(error => {
        console.log("error " + error);
      });


    }
  }
  prescription(event){
    console.log(event.target.checked)
    this.productprescription = event.target.checked;
  }
}
