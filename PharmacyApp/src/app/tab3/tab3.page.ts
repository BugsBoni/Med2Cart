import { Component } from '@angular/core';
import { Router, NavigationExtras  } from "@angular/router";
import { BarcodeScanner,BarcodeScannerOptions  } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  scannedData: any;
  constructor(public router: Router,private barcodeScanner: BarcodeScanner) { }

  scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      this.scannedData = barcodeData;
      let navigationExtras: NavigationExtras = {
        queryParams: {
          special: this.scannedData["text"]
        }
      };
      this.router.navigate(["/transactioninfo"],navigationExtras);
    }).catch(err => {
      console.log('Error', err);
    });
  }
  ionViewDidEnter(){
    this.scanBarcode();
  }

}
