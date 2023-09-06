import { Component, OnInit } from '@angular/core';
import { CartsService } from 'src/app/carts/services/carts.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  loading : boolean = false;
  cartProducts:any[]=[]
  constructor(private service: ProductsService , private cartService:CartsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories()
  }

  getProducts() {
    this.loading = true
    return this.service.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loading = false
      console.log(res)
    }, error => {
      alert(error)
      this.loading = false
    })
  }

  getCategories() {
    this.loading = true
    return this.service.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.loading = false
      console.log(res)
    }, error => {
      alert(error)
      this.loading = false
    })
  }

  filterCategory(e: any) {
    let value = e.target.innerHTML.toLowerCase();
    value === 'all' ? this.getProducts() : this.getProductsCategory(value);
  }

  getProductsCategory(keyword: string) {
    this.loading = true
    this.service.getProductsByCategory(keyword).subscribe((res: any) => {
      this.products = res
      this.loading = false
      console.log(this.products)
    })
  }

  

  addToCart(event:any){
    // JSON.stringify //send data
    // JSON.parse // recive data

    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)

      let exist = this.cartProducts.find(item=>item.item.id == event.item.id)
      if(exist){
        alert("Product is already in your cart")
      }
      else{
        this.cartProducts.push(event)
        localStorage.setItem("cart",JSON.stringify(this.cartProducts))
      }
    }
    else{
      this.cartProducts.push(event)
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    }
    this.cartService.raiseDateEmitterEvent(true)
  }
}
