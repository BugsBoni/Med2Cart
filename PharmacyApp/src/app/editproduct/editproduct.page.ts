import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.page.html',
  styleUrls: ['./editproduct.page.scss'],
})
export class EditproductPage implements OnInit {
  productlist: any[];
  finalList: any[];
  searchword: string;
  constructor(private router: Router,public fetch: FirebaseService,
    private alertControl: AlertController) { }

  ngOnInit() {
    this.searchword = "";
    this.productlist = [];
    this.finalList = [];
    this.fetchProducts();
  }
  search(){
    this.finalList = [];
    console.log(this.searchword);
    for(var x = 0;x < this.productlist.length;x++){
      if(this.productlist[x].name.includes(this.searchword)){
        this.finalList.push(this.productlist[x]);
      }
    }
  }
  openProductDetails(id,name){
    let navigationExtras: NavigationExtras = {
      state: {
        productid: id,
        productname: name
      }
    };
    this.router.navigate(['productdetails'],navigationExtras);
  }
  async deleteProduct(id,name){
    const alert = await this.alertControl.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Delete <strong>'+name+'</strong>?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
           
            this.fetch.deleteProduct(id).then(()=>{
            }).catch(err=>{
            })
          }
        }
      ]
    });
    await alert.present();
    
  }
  fetchProducts(){
    this.fetch.getProducts().subscribe(data=>{
      this.productlist = [];
      this.finalList = [];
      this.productlist = data.map(e=>{
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          image: e.payload.doc.data()['image']
        };
        
      })
      console.log(this.productlist)
      this.finalList = this.productlist;
    })
  }

}
