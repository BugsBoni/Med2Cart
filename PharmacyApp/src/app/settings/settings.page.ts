import { Component, OnInit } from '@angular/core';
import {Globals} from "../global";
import { Router } from "@angular/router";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private global: Globals,public router: Router) { }

  ngOnInit() {
  }
  announcements(){
    this.router.navigate(["announcements"]);
  }
  cor(){
    this.router.navigate(["cor"]);
  }
  faqs(){
    this.router.navigate(["faqs"]);
  }
  logout(){
    this.router.navigate(["login"]);
  }
}
