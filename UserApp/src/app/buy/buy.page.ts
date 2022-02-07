import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { FirebaseService } from "../services/firebase.service";
import { Globals } from "../global";
import { orders } from "../models/order"
@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
  id;
  productname;
  price;
  description;
  quantity;
  prescription = false;
  image;
  constructor(private router: Router,private global: Globals,private route: ActivatedRoute,private fb: FirebaseService) {
    this.route.queryParams.subscribe(params =>{
      this.id = params['id'];
      this.productname = params['productname'];
      this.price = params['price'];
      this.image = params['image'];
      this.description = params['description'];
      this.prescription = params['prescription'];
      console.log(this.prescription)
    })
   }
  ngOnInit() {
    this.quantity = 1;
  }
  back(){
    this.router.navigate(["tabs/tab1"])
  }
  dcrs(){
    if(this.quantity <= 1){
      this.quantity = 1;
    }
    else{

      this.quantity--;
    }
  }
  incrs(){
    this.quantity++;
  }
  buy(){
    this.fb.cart.push({
      id: this.id,
      productname: this.productname,
      price: +this.price,
      description: this.description,
      quantity: +this.quantity,
      total: +this.quantity * +this.price,
      prescription: this.prescription
    });
  }
  order(){
    alert('Order Added');
    // var idCheck = false;
    var x = {
      id: this.id,
      productname: this.productname,
      price: +this.price,
      description: this.description,
      quantity: +this.quantity,
      total: +this.quantity * +this.price,
      image: this.image,
      prescription: this.prescription
    }
    var numberoforders = this.global.ordernum;
    console.log(numberoforders);
    if(numberoforders < 1){
      this.global.ordernum++;
      this.global.orderData = [];
      this.global.orderData.push(x);
      console.log(this.global.orderData);
    }
    else{
    var orders: orders[];
    orders = this.global.orderData; 
    var checkmoto = false;
    for(var order = 0;order < numberoforders;order++ ){
      if(this.id === orders[order].id){
        console.log(this.global.orderData[order]);
        var orderquan = this.global.orderData[order].quantity
        var orderprice = this.global.orderData[order].price
        orderquan = +orderquan + +this.quantity;
        var ordertotal = orderquan * orderprice
        
        this.global.orderData[order].quantity = orderquan;
        this.global.orderData[order].total = ordertotal;
        console.log(ordertotal);
        checkmoto = true;
        break;
      }
      else{
      }
    }
    if(checkmoto){
    }
    else{
      this.global.ordernum++;
      this.global.orderData.push(x);
      console.log(this.global.orderData);
    }
  }
  }

}
