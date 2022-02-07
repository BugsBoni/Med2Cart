import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  question: string;
  answer: string;
  faqList: any[];
  constructor(private loadingController: LoadingController,private alertController: AlertController,private fetch: FirebaseService) { }

  ngOnInit() {
    this.question = "";
    this.answer = "";
    this.fetchFaq();
  }
  fetchFaq(){
    this.fetch.getFaq().subscribe(data=>{
      this.faqList = [];
      this.faqList = data.map(data2=>{
        return {
          id: data2.payload.doc.id,
          question: data2.payload.doc.data()["question"],
          answer: data2.payload.doc.data()["answer"]
        }
      })
    })
  }
  async saveFaq(){
    if(this.question == ""){
      alert("invalid question");
    }
    else if(this.answer == ""){
      alert("invalid answer");
    }
    else{
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
      });
      await loading.present();
      this.fetch.saveFaq(this.question,this.answer).then(data=>{
        alert("FAQ Saved Successfully");
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
  async deletefaq(id){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Delete FAQ?',
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
            this.fetch.removeFaq(id).then(()=>{
              this.presentAlert();
            }).catch(()=>{
            })
            
          }
        }
      ]
    });
    await alert.present();
  }

}
