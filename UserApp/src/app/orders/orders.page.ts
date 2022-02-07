import { Component, OnInit } from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import {
  BarcodeScannerOptions,
  BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  id;
  data: any[];
  encodeData: any;
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  constructor(private barcodeScanner: BarcodeScanner,public route: ActivatedRoute,public fb: FirebaseService) { 
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
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
  createBarcode() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.id).then((encodedData) => {
    }, (err) => {
      console.log('Error occured : ' + err);
    });
  }
  ngOnInit() {
  }
  getOrderInfo(){
    
  }
  cancelOrder(id){
    console.log(id)
    this.fb.updateStatus(this.id,"declined").then(data=>{
      alert("Order Cancelled")
    }).catch(data=>{

    })
  }

}
