import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { LoadingController } from '@ionic/angular';
import { Globals } from '../global';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  
  constructor(public router: Router,public global: Globals,public fb: FirebaseService,public loadingController: LoadingController) { }

  ngOnInit() {
  }
  async login(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    });
    await loading.present();
    if(this.password == ""){
      alert("Please enter a password!");
      loading.dismiss();
    }
    else if(this.username == ""){
      alert("Please select a username!");
      loading.dismiss();
    }
    else{
      this.fb.login(this.username,this.password).subscribe(data=>{
        if(data.length > 0){
        console.log(data);
        this.global.gender = data[0].payload.doc.data()["gender"];
        this.global.userlevel = data[0].payload.doc.data()["userlevel"];
        this.global.name = data[0].payload.doc.data()["name"];
        this.global.email = data[0].payload.doc.data()["email"];
        this.global.birthdate = data[0].payload.doc.data()["birthdate"];
        this.global.age = data[0].payload.doc.data()["age"];
        this.global.mobilenumber = data[0].payload.doc.data()["mobilenumber"];
        this.global.username = data[0].payload.doc.data()["username"];
        this.global.password = data[0].payload.doc.data()["password"];
        this.global.image = data[0].payload.doc.data()["image"];
        this.global.userid = data[0].payload.doc.id;
        loading.dismiss();
        if(this.global.userlevel == 'Rider'){

          this.router.navigate(["tabs/tab5"]);
        }
        else{

          this.router.navigate(["tabs"]);
        }
        }
        else{
          alert("Login Failed!");
          loading.dismiss();
        }
      })
  }
  }

}
