import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
@Component({
  selector: 'app-transactioninfo',
  templateUrl: './transactioninfo.page.html',
  styleUrls: ['./transactioninfo.page.scss'],
})
export class TransactioninfoPage implements OnInit {
  id;
  data: any[];
  constructor(public route: ActivatedRoute,public fb: FirebaseService) { 
    
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.id = params.special;
       
        this.fb.getOrderInfo(this.id).subscribe(data=>{
          this.data = [];
          this.data.push(data as any);
        })
      }
    });
   
  }
  accept(){
   this.fb.updateStatus('accepted',this.id).then(data=>{
    alert("Order Accepted");
   }).catch(err=>{
   })
  }
  decline(){
    this.fb.updateStatus('declined',this.id).then(data=>{
      alert("Order Declined");
     }).catch(err=>{
     })
  }
  complete(){
    this.fb.updateStatus('completed',this.id).then(data=>{
      alert("Order Completed");
     }).catch(err=>{
     })
  }
  ngOnInit() {
  }
  getOrderInfo(){
    
  }
}
