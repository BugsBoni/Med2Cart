import { Component} from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import { FirebaseService } from '../services/firebase.service';
interface productData {
  productname: string;
  price: number;
  description: string;
  id: string;
  img: string;
  prescription: boolean;
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  productdata: productData;
  productList: productData[];
  finalList: any[];
  announcementList: any[];
  slideOpts = {
    autoplay: {
      delay: 5000
    },
    loop: true,
    loopAdditionalSlides: 2,
    setWrapperSize: true,
  };
  searchword: string;
  constructor(public router: Router,private firebaseService: FirebaseService) {
    this.productdata = {} as productData;
    this.firebaseService.read_students().subscribe(data => {

      this.productList = data.map(e => {
        return {
          id: e.payload.doc.id,
          productname: e.payload.doc.data()['name'],
          price: e.payload.doc.data()['price'],
          image: e.payload.doc.data()['image'],
          description: e.payload.doc.data()['description'],
          img: "",
          prescription: e.payload.doc.data()['prescription']
        };
      }) 
      console.log(this.productList);
      this.finalList = this.productList;

    });
  }
  search(){
    this.finalList = [];
    console.log(this.searchword);
    for(var x = 0;x < this.productList.length;x++){
      if(this.productList[x].productname.includes(this.searchword)){
        this.finalList.push(this.productList[x]);
      }
    }
  }
  ionViewDidEnter(){
    
    console.log("bubu")
    this.announcementList = [];
    this.firebaseService.read_announcement().subscribe(data => {

      this.announcementList = data.map(e => {
        return {
          id: e.payload.doc.id,
          image: e.payload.doc.data()['image'],
        };
      }) 

    });
  }
  navToBuy(id,productname,price,description,image,prescription){
    let NavigationExtras: NavigationExtras = {
      queryParams: {
        id: id,
        productname: productname,
        price: price,
        description: description,
        image: image,
        prescription: prescription
      }
    }
    this.router.navigate(["/buy"],NavigationExtras);
  }
}
