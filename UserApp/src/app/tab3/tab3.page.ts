import { Component } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import { Globals } from '../../app/global';
import { FirebaseService } from "../services/firebase.service";

interface orderData {
        name: string,
        id: string,
        
            total: number
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  orderList: orderData[];
  segment = 'pending';
  constructor(public global: Globals,public dbService: FirebaseService,public router: Router) {
    
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
  navToOrders(id) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: id
      }
    };
    this.router.navigate(["/orders"],navigationExtras);
  }
  ionViewDidEnter() {
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
  login(){
    this.router.navigate(["login"]);
  }
}
