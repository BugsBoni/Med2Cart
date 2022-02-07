import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { orders } from "../models/order";
import { Globals } from '../global';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';

import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  temporder: any[];
  total: number;
  address: string;
  selectedPayment: string;
  shippingFee: number;
  shopee: any[];

  name: any[];
  photo: any[];
  price: any[];
  quantity: any[];
  totalpurchase: any[];
  img1: any;
  imagename: any;
  
 imagefile: any;
 imageUrl = "";
  constructor(private storage: AngularFireStorage,public router: Router,private db: AngularFirestore,private global: Globals,private route: ActivatedRoute,private fb: FirebaseService) { }

  ngOnInit() {
    
    this.total = 0;
    this.shippingFee = 50;
    this.address = "";
    this.selectedPayment = "cod";
    this.name = [];
    this.photo = [];
    this.price = [];
    this.quantity = [];
    this.totalpurchase = [];
    this.checkout();
    
    this.getTotal();
  }
  checkout(){
    this.temporder = this.global.orderData;
    this.getArrayVal();
  }
  getTotal(){
    for(var x = 0; x < this.temporder.length; x++){
      this.total = this.total + this.temporder[x].total;
    }
  }
  getArrayVal(){
    for(var x = 0; x < this.temporder.length; x++){
      console.log(this.temporder[x]);
      this.name.push(this.temporder[x].productname);
      this.photo.push(this.temporder[x].image);
      this.price.push(this.temporder[x].price);
      this.quantity.push(this.temporder[x].quantity);
      this.totalpurchase.push(this.temporder[x].total);
    }
  }
  payment(event){
    this.selectedPayment = event.target.value;
    if(this.selectedPayment == "cod"){
      this.shippingFee = 50;
    }
    else{
      this.shippingFee = 0;
    }
  }
  endTransac(){
    if(this.global.name == ""){
      alert("Please edit account information first");
    }
    else{
      var e = new Date();
      this.db.collection('Order').add({
        addressropoff: this.address,
        status: 'pending',
        subtotal: +this.total,
        shipping: +this.shippingFee + +this.total,
        userid: this.global.userid,
        date: e,
        contactnumber: this.global.mobilenumber,
        name: this.global.name,
        picture: this.global.image,
        productname: this.name,
        photo: this.photo,
        price: this.price,
        quantity: this.quantity,
        total:this.totalpurchase,
        payment: this.selectedPayment,
        attachment: ''
      }).then(datax => {
        if(this.imagefile != null){
          const file = this.imagefile.item(0);
          const path = `Attachments/${this.name}/${new Date().getTime()}_${file.name}`;
          const customMetadata = { app: 'Attachment Upload' };
          const fileRef = this.storage.ref(path);
          this.storage.upload(path, file, { customMetadata }).then(data=>{
            data.ref.getDownloadURL().then(data2=>{
              this.imageUrl = data2;
              this.db.collection("Order").doc(datax.id).update({
                attachment: this.imageUrl
              })
        }).catch(err=>{
    
        })
      }).catch(err=>{
    
      })
      }
        alert("Order Placed Successfully!");
        this.total = 0;
        this.shippingFee = 50;
        this.address = "";
        this.selectedPayment = "cod";
        this.name = [];
        this.photo = [];
        this.price = [];
        this.quantity = [];
        this.totalpurchase = [];
        this.temporder = [];
        this.global.orderData= [];
        this.global.ordernum = 0;
        this.router.navigate(["tabs/tab3"]);
      });
      return;
    }
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
}
