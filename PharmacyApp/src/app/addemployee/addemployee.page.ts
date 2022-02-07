import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FirebaseService } from "../services/firebase.service";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.page.html',
  styleUrls: ['./addemployee.page.scss'],
})
export class AddemployeePage implements OnInit {
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

  // Upload Task 
 task: AngularFireUploadTask;

 // Progress in percentage
 percentage: Observable<number>;

 // Snapshot of uploading file
 snapshot: Observable<any>;

 // Uploaded File URL
 UploadedFileURL: Observable<string>;


 //File details  
 fileName:string;
 fileSize:number;

 //Status check 
 isUploading:boolean;
 isUploaded:boolean;
 imageFile: any;

 images: any;
 img1: any;
 imagename: any;
 imagefile: any;
 imageUrl = "";
  constructor(private router: Router,private storage: AngularFireStorage,
    private database: AngularFirestore,
    public fb: FirebaseService,public loadingController: LoadingController) { }

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
  }
  selectGender(event){
    this.selectedGender = event.target.value;
  }
  selectLevel(event){
    this.selectedLevel = event.target.value;
  }
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
        
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file.name);
    this.imagename = file.name;
    this.imagefile = fileList
  }
  async saveEmployee(){
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
    else if(this.password != this.password2){
      alert("Password do not match!");
      loading.dismiss();
    }
    else{
      var x1 = {
        gender: this.selectedGender,
        userlevel: this.selectedLevel,
        name: this.name,
        email:this.email,
        birthdate: this.birthdate,
        age: +this.age,
        mobilenumber: this.mobilenumber,
        username: this.username,
        password: this.password
      }
      this.fb.saveEmployee(x1).then(datax=>{
        loading.dismiss();
          console.log(datax);
          const file = this.imagefile.item(0);
          this.fileName = file.name;
          const path = `Products/${this.name}/${new Date().getTime()}_${file.name}`;
          const customMetadata = { app: 'Products Upload' };
          const fileRef = this.storage.ref(path);
          // this.task = this.storage.upload(path, file, { customMetadata }).then(()=>{
          this.storage.upload(path, file, { customMetadata }).then(data=>{
            data.ref.getDownloadURL().then(data2=>{
              this.imageUrl = data2;
              this.database.collection("employees").doc(datax.id).update({
                image: this.imageUrl
              }).then(()=>{
                loading.dismiss();
                this.name = "";
                this.email = "";
                this.birthdate = "";
                this.age = 0;
                this.mobilenumber = "";
                this.username = "";
                this.password = "";
                this.password2 = "";
                this.router.navigate(["tabs/tab1"]);
              }).catch(error=>{
                alert(error);
              })
              
            })
          }).catch(error=>{
            alert(error);
          });
      }).catch(error=>{
        alert(error);
        loading.dismiss();
      });;
    }
  }
}
