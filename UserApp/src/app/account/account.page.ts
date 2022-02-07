import { Component, OnInit } from '@angular/core';
import { Globals } from "../global";
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  name: string;
  email: string;
  constructor(public router: Router,
    public global: Globals,
    public fetch: FirebaseService,
    public alertController: AlertController) { }

  ngOnInit() {
    this.name = "";
    this.email = "";
  }
  login(){
    this.router.navigate(["login"]);
  }
  presentAlert(){
    alert("Updated Successfully");
  }
  
  async updateName(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Update name?',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Update',
          handler: data => {
            this.fetch.updateName(this.global.userid,data.name).then(()=>{
              this.name = data.name;
              this.global.name = data.name;
              this.presentAlert();
            }).catch(()=>{
            })
          }
        }
      ]
    });
    await alert.present();
  }
  async updateEmail(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Update email?',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Update',
          handler: data => {
            this.fetch.updateEmail(this.global.userid,data.email).then(()=>{
              this.email = data.email;
              this.global.email = data.email;
              this.presentAlert();
            }).catch(()=>{
            })
          }
        }
      ]
    });
    await alert.present();
  }
  faqs(){
    this.router.navigate(["faqs"]);
  }
}
