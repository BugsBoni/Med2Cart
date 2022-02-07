import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "../services/firebase.service";
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  faqList: any[];
  constructor(public fetch: FirebaseService) { }

  ngOnInit() {
    this.faqList = [];
    this.fetch.read_faqs().subscribe(data => {

      this.faqList = data.map(e => {
        return {
          id: e.payload.doc.id,
          answer: e.payload.doc.data()['answer'],
          question: e.payload.doc.data()['question']
        };
      }) 

    });
  }


}
