import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  productlist: any[];
  finalList: any[];
  searchword: string;
  constructor(private router: Router,public fetch: FirebaseService,
    private alertControl: AlertController) {}
  edit(){
    this.router.navigate(["editemployee"]);
  }
  add(){
    this.router.navigate(["addemployee"]);
  }
  ngOnInit() {
    this.searchword = "";
    this.productlist = [];
    this.finalList = [];
    this.fetchProducts();
  }
  openEmployeeDetails(id,name){
    let navigationExtras: NavigationExtras = {
      state: {
        employeeid: id,
        employeename: name
      }
    };
    this.router.navigate(['employeedetails'],navigationExtras);
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
  async deleteEmployee(id,name){
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
           
            this.fetch.deleteEmployee(id).then(()=>{
            }).catch(err=>{
            })
          }
        }
      ]
    });
    await alert.present();
    
  }
  fetchProducts(){
    this.fetch.getEmployee().subscribe(data=>{
      this.productlist = [];
      this.finalList = [];
      this.productlist = data.map(e=>{
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          image: e.payload.doc.data()['image'],
          userlevel: e.payload.doc.data()['userlevel']
        };
        
      })
      console.log(this.productlist)
      this.finalList = this.productlist;
    })
  }
}
