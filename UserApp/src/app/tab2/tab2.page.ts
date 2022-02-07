import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { orders } from "../models/order";
import { Globals } from '../global';

import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  
  temporder: orders[];
  itemsincart: number = 0;
  shopee: any[];
  subtotal:number = 0;
  shipping:number = 50;
  total:number = 0;
  constructor(private db: AngularFirestore,public global: Globals,public router: Router,private fb: FirebaseService) {
    
  }
  navToCheckout(){
    this.router.navigate(["/checkout"]);
  }
  getCart(){
    console.log(this.fb.cart);
  }
  login(){
    this.router.navigate(["/login"]);
  }
  ngOnInit() {
    this.getCart();

  }
  ionViewDidEnter(){
    this.getTempData();
  }
  getTempData(){
    this.temporder = this.global.orderData;
    console.log(this.temporder);
    this.itemsincart = this.global.ordernum;
    this.subtotal = 0;
    this.shopee = [];
    for(var x = 0; x < this.global.ordernum;x++){
      var y = this.temporder[x].total as number;
      this.subtotal+=y;
      this.shopee.push(this.temporder[x].id);
    }
    this.total = this.subtotal + this.shipping;
    console.log(this.shopee);
    }
    reduceOrder(i){
      for(var x = 0; x < this.global.ordernum;x++){
        if(i === this.global.orderData[x].id){
          var reduceby1 = this.global.orderData[x].quantity;
          var totalnew = this.global.orderData[x].price;
          this.global.orderData[x].quantity = reduceby1;
          reduceby1--;
          totalnew = totalnew * reduceby1;
          this.global.orderData[x].quantity = reduceby1;
          this.global.orderData[x].total = totalnew;
          if(reduceby1 < 1){
            this.global.ordernum--;
            this.global.orderData.splice(x, 1);
          }
          this.getTempData();
        }
      }
    }
    checkout(){
      this.router.navigate(["checkout"]);
  //     var removedupli = this.shopee,
  //  reduced = Object.keys(removedupli.reduce((p,c)=>(p[c]=true,p),{}))
  //   console.log(reduced);
  //     var e = new Date();
  //    this.db.collection('Order').add({
  //       addressropoff: "test address",
  //       status: 'pending',
  //       subtotal: this.subtotal,
  //       shipping: this.shipping,
  //       userid: "testuserid",
  //       date: e,
  //       contactnumber: "testnumber",
  //       name: "testname",
  //       picture: "testpicture",
  //     }).then(key => {
  //       for(var x = 0; x < this.shopee.length;x++){
  //         var savetemp = {
  //           id: this.temporder[x].id,
  //           name: "testname",
  //           photo: "testpic",
  //           price: this.temporder[x].price,
  //           quantity: this.temporder[x].quantity,
  //           total: this.temporder[x].total,
  //           status: 'pending'
  //         }
  //         this.db.collection('Order').doc(key.id).update(savetemp).then(()=>{
  //         });
  //       }
  //     });
  //     return;
    
}
}
