import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartProducts:any[] =[]
  total:any = 0
  success:boolean = false
  exist:boolean = true
  constructor(private cartService:CartsService){}
  
  ngOnInit(): void {
    this.getCartProducts()
    // if(this.cartProducts.length == 0){
    //   this.exist = false
    //   localStorage.setItem("exist",JSON.stringify(this.exist))
    // }else{
    //   this.exist = true
    //   localStorage.setItem("exist",JSON.stringify(this.exist))
    // }
    

  }

 

  


  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    this.getCartTotal()
  }

 

  addAmount(index:number){
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }

  minsAmount(index:number){
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    if(this.cartProducts[index].quantity<0){
      this.cartProducts[index].quantity=0;
    }
  }

  detectChange(){
    this.getCartTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }

  deleteProduct(index:number){
    this.cartProducts.splice(index,1)
    this.getCartTotal()
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }

  clearCart(){
    this.cartProducts = [];
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    this.cartService.raiseDateEmitterEvent(false);
    this.getCartTotal()
    this.success = false;
  }

  getCartTotal(){
    this.total = 0;
    for(let x in this.cartProducts){
      this.total+= this.cartProducts[x].item.price * this.cartProducts[x].quantity
      if(this.cartProducts[x].quantity<0){
        this.total=0;
      }
    }
  }

  addCart(){
    let products = this.cartProducts.map(item=>{
      return {productsId:item.item.id , quantity:item.quantity}
    })

    let Model = {
      userId:5,
      data:new Date(),
      products:products
    }

    this.cartService.createNewCart(Model).subscribe((res)=>{
      this.success = true
      localStorage.setItem('cart',JSON.stringify([]))
    },(error) => {
      console.log(error);
      this.success = false;
    })
    
    this.getCartTotal()
  }
}
