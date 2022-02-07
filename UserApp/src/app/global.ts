import { Injectable} from '@angular/core'

@Injectable()
export class Globals{
    orderData: any[];
    ordernum = 0;
    loggedin = false;
    name = "";
    email = "";
    mobilenumber = "";
    image = "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png";
    userid = "";
}