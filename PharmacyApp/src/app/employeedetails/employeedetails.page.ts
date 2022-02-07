import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { FirebaseService } from "../services/firebase.service";
import { LoadingController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.page.html',
  styleUrls: ['./employeedetails.page.scss'],
})
export class EmployeedetailsPage implements OnInit {
  selectedGender: string;
  selectedLevel: string;
  name: string;
  email: string;
  birthdate: string;
  age: number;
  mobilenumber:string;
  username: string;
  password: string;
  password2: string;
  images: any;
  img1: any;
  imagename: any;
  imagefile: any;
  imageUrl = "";
  employeeid: string;
  employeename: string;
  constructor(private database: AngularFirestore,public loadingController: LoadingController,public route: ActivatedRoute,public router: Router,private fetch: FirebaseService) { 
    this.route.queryParams.subscribe(data=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.employeeid = this.router.getCurrentNavigation().extras.state.employeeid;
        this.employeename = this.router.getCurrentNavigation().extras.state.employeename;
      }
    })
  }

  ngOnInit() {
    this.selectedGender = "Male";
    this.selectedLevel = "Employee"
    this.name = "";
    this.email = "";
    this.birthdate = "";
    this.age = 0;
    this.mobilenumber = "";
    this.username = "";
    this.password = "";
    this.password2 = "";
    this.fetchEmployees();
  }
  selectGender(event){
    this.selectedGender = event.target.value;
  }
  selectLevel(event){
    this.selectedLevel = event.target.value;
  }
  fetchEmployees(){
    this.fetch.getEmployeesWithId(this.employeeid).subscribe(data=>{
    this.selectedGender = data.payload.data()['gender'];
    this.selectedLevel = data.payload.data()['userlevel'];
    this.name = data.payload.data()['name'];
    this.email = data.payload.data()['email'];
    this.birthdate = data.payload.data()['birthdate'];
    this.age = data.payload.data()['age'];
    this.mobilenumber = data.payload.data()['mobilenumber'];
    this.username = data.payload.data()['username'];
    this.password = data.payload.data()['password'];
    this.images = data.payload.data()['image']
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
    else if(this.username == ""){
      alert("Please select a category!");
      loading.dismiss();
    }
    else{
      //Set document id with value in database
      this.database.collection("employees").doc(this.employeeid).update({
        gender: this.selectedGender,
        userlevel: this.selectedLevel,
        name: this.name,
        email: this.email,
        birthdate: this.birthdate,
        age: this.age,
        mobilenumber: this.mobilenumber,
        username: this.username,
        password: this.password
      }).then(resp => {
        loading.dismiss();
        alert("Employee Updated Successfully")
      }).catch(error => {
        console.log("error " + error);
      });
    
    
  }

  }

}
