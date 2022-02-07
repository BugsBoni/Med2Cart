import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-cor',
  templateUrl: './cor.page.html',
  styleUrls: ['./cor.page.scss'],
})
export class CorPage implements OnInit {
  reason: string;
  reasonList: any[];
  constructor(private loadingController: LoadingController,private alertController: AlertController,private fetch: FirebaseService) { }

  ngOnInit() {
    this.reason = "";
    this.fetchReason();
  }
  fetchReason(){
    this.fetch.getReason().subscribe(data=>{
      this.reasonList = [];
      this.reasonList = data.map(data2=>{
        return {
          id: data2.payload.doc.id,
          reason: data2.payload.doc.data()["reason"]
        }
      })
    })
  }
  async saveReason(){
    if(this.reason == ""){
      alert("invalid reason");
    }
    else{
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      });
      await loading.present();
      this.fetch.saveReason(this.reason).then(data=>{
        alert("Reason Saved Successfully");
        loading.dismiss();
      }).catch(err=>{
        alert(err);
        loading.dismiss();
      });
      
    }
    
  }
  presentAlert(){
    alert("Deleted Successfully");
  }
  async deletereason(id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Delete Reason?',
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
            this.fetch.removeReason(id).then(()=>{
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
}
