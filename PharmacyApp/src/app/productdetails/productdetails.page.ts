import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  images: any;
  img1: any;
  imagename: any;
  imagefile: any;
  name: string;
  price: number;
  description: string;
  productprescription: boolean;
  imageUrl = "";
  productid: string;
  productname: string;
  productinfo: any[];
  constructor(private storage: AngularFireStorage, private database: AngularFirestore,public loadingController: LoadingController,public route: ActivatedRoute,public router: Router,private fetch: FirebaseService) { 
    this.route.queryParams.subscribe(data=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.productid = this.router.getCurrentNavigation().extras.state.productid;
        this.productname = this.router.getCurrentNavigation().extras.state.productname;
        console.log(this.productid);
      }
    })
  }

  ngOnInit() {
    this.productprescription = false;
    this.name = "";
    this.price = 0;
    this.description = "";
    this.images = "";
    this.productinfo = [];
    this.fetchProducts();
  }
  prescription(event){
    console.log(event.target.checked)
    this.productprescription = event.target.checked;
  }
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
        this.images.push(this.img1);
        
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file.name);
    this.imagename = file.name;
    this.imagefile = fileList;
  }
  removeImg(i){
    this.images = null;
    this.imagename = null;
    this.imagefile = null;
  }
  fetchProducts(){
    this.fetch.getProductsWithId(this.productid).subscribe(data=>{
      this.productprescription = data.payload.data()['prescription'];
      this.name = data.payload.data()['name'];
      this.price = data.payload.data()['price'],
      this.images = data.payload.data()['image'],
      this.description = data.payload.data()['description'];
    })
    console.log(this.name);
  }

  async uploadFile() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    if(this.name == ""){
      alert("Please enter a product name!");
      loading.dismiss();
    }
    else if(this.price == 0){
      alert("Please enter product price!");
      loading.dismiss();
    }
    else{
      //Set document id with value in database
      this.database.collection("products").doc(this.productid).update({
          name: this.name,
          price: +this.price,
          description: this.description,
          prescription: this.productprescription
      }).then(resp => {
        loading.dismiss();
        alert("Product Updated Successfully")
      }).catch(error => {
        console.log("error " + error);
      });
    
    
  }

  }
}
