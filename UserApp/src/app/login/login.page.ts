import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthServiceService } from '../auth-service.service';
import firebase from 'firebase/compat/app';
import { Router } from "@angular/router";
import { Globals } from "../global";
import { FirebaseService } from "../services/firebase.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any = '+91';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  name: string;
  email: string;
  image: string;
  userid: string;
  constructor(
    private alertController: AlertController,
    private authService: AuthServiceService,
    public router: Router,
    public global: Globals,
    public fb: FirebaseService
  ) { }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'visible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    });
  }
  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
  checkUser(){
    this.fb.getUser(this.PhoneNo).subscribe(data=>{
      if(data.length > 0){
        this.global.name = data[0].payload.doc.data()["name"];
        this.global.email = data[0].payload.doc.data()["email"];
        this.global.image = data[0].payload.doc.data()["image"];
        this.global.userid = data[0].payload.doc.id;
        this.global.mobilenumber = this.PhoneNo;
        this.router.navigate(["tabs/tab1"]);
      }
      else{
      }
    }).unsubscribe();
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber($event) {
    const a = this.fb.getUser(this.PhoneNo).subscribe(data=>{
      if(data.length > 0){
        this.global.name = data[0].payload.doc.data()["name"];
        this.global.email = data[0].payload.doc.data()["email"];
        this.global.image = data[0].payload.doc.data()["image"];
        this.global.userid = data[0].payload.doc.id;
        this.global.mobilenumber = this.PhoneNo;
        this.global.loggedin = true;
        this.router.navigate(["tabs/tab1"]);
      }
      else{
        console.log('country', this.recaptchaVerifier);

      if (this.PhoneNo) {
        this.authService.signInWithPhoneNumber(this.recaptchaVerifier, '+63' + this.PhoneNo).then(
          success => {
            this.OtpVerification();
          }
        );
      }
      }
    });
  }
  login(){
    this.router.navigate(["tabs/tab1"]);
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
            this.global.mobilenumber = this.PhoneNo;
            this.global.loggedin = true;
            this.fb.addUser(this.PhoneNo).then(data=>{
              this.global.userid = data.id;
              this.router.navigate(["tabs/tab1"]);
            })
            
          }
        }
      ]
    });
    alert.present();
  }
  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authService.enterVerificationCode(res.otp).then(
            userData => {
              this.showSuccess();
              console.log(userData);
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }
}
