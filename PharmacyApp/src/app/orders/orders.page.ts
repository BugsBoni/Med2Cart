import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";

import { FirebaseService } from "../services/firebase.service";

interface orderData {
  name: string,
  id: string,
  
      total: number
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orderList: orderData[];
  segment = 'pending';
  constructor(public router: Router,public dbService: FirebaseService) {
    

   }
   segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.segment = ev.target.value;
    this.dbService.getHistory(this.segment).subscribe(data=>{
      this.orderList = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          total: e.payload.doc.data()['subtotal'],
          status: e.payload.doc.data()['status'],
        };
        
      })
      console.log(this.orderList); 
    });     
  }
   ionViewDidEnter(){
    this.dbService.getHistory(this.segment).subscribe(data=>{
      this.orderList = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          total: e.payload.doc.data()['subtotal'],
          status: e.payload.doc.data()['status'],
        };
        
      })
      console.log(this.orderList); 
    });     
   }
  ngOnInit() {
  }
  nav2OrderInfo(id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: id
      }
    };
    this.router.navigate(["/transactioninfo"],navigationExtras);
  }
}
