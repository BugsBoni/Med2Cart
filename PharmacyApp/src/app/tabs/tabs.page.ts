import { Component } from '@angular/core';
import { Globals } from "../global";
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  userlevel: string;
  constructor(public global: Globals) {
    this.userlevel = global.userlevel;
  }

}
