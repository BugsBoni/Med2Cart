import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.page.html',
  styleUrls: ['./announcements.page.scss'],
})
export class AnnouncementsPage implements OnInit {
  img1: any;
  images: any;
  imagenames: any;
  imagefiles: any;
  announcementList: any[];
  filename: string;
  constructor(private loadingController: LoadingController, private storage: AngularFireStorage ,private alertController: AlertController,private fetch: FirebaseService) { }

  ngOnInit() {
    this.images = "";
    this.imagenames = "";
    this.imagefiles= "";
    this.announcementList = [];
    this.fetchAnnouncement();
  }
  fetchAnnouncement(){
    this.fetch.getAnnouncements().subscribe(data=>{
      this.announcementList = [];
      this.announcementList = data.map(data2=>{
        return {
          id: data2.payload.doc.id,
          image: data2.payload.doc.data()["image"]
        }
      })
    })
  }
  async deleteAnnouncement(id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Delete announcement?',
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
            this.fetch.removeAnnouncement(id).then(()=>{
              this.presentAlert();
            }).catch(()=>{
            })
            
          }
        }
      ]
    });

    await alert.present();
    console.log(id);
  }
  presentAlert(){
    alert("Deleted Successfully");
  }
  fileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
        this.images = this.img1
        
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
    console.log(file.name);
    this.imagenames=file.name;
    this.imagefiles =fileList;
  }
  async saveAnnouncement(){
    if(this.images == ""){
      alert("invalid image");
    }
    else if(this.images == undefined){
      alert("invalid image");
    }
    else{
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      });
      await loading.present();

      const file = this.imagefiles.item(0);
      this.filename = file.name;
      const path = `Announcement/${new Date().getTime()}_${file.name}`;
      const customMetadata = { app: 'Announcement Upload' };
      const fileRef = this.storage.ref(path);

      this.storage.upload(path, file, { customMetadata }).then(data=>{
        data.ref.getDownloadURL().then(data2=>{
          var imageurl = data2;
          this.fetch.saveAnnouncement(imageurl).then(()=>{
            alert("Announcement save successfully");
            this.images = "";
            this.imagefiles = "";
            this.imagenames = "";
            loading.dismiss();
          }).catch(err=>{
            loading.dismiss();
            alert(err.message);
          })
          
        })
      }).catch(error=>{
        loading.dismiss();
        alert(error);
      });
    }
  }

}
