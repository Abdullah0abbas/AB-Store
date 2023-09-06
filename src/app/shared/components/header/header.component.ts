import { Component, OnInit } from '@angular/core';

import { CartsService } from 'src/app/carts/services/carts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  exist: boolean = false
  classToggled = false;
 
  cartNotEmpty: any = false
  constructor(private cartService:CartsService){}
  ngOnInit() {
    // this.exist = JSON.parse(localStorage.getItem("exist")!)
    // console.log(this.exist)

    if (JSON.parse(localStorage.getItem('cart')!).length > 0) {
      this.cartService.raiseDateEmitterEvent(true)
    }

    this.cartService.dataEmitter.subscribe((value: any)=>{
      this.cartNotEmpty=value 
    })
  
  } 

  
  isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  
}
