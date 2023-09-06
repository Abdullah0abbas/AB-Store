import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  id: any
  data: any = {}
  productRating!: number
  loading: boolean = false;
  stars: number[] = []
  emptyStars: number[] = []
  amount: number = 1;
  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }


  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.loading = true
    this.service.getProductById(this.id).subscribe((res: any) => {
      this.data = res
      this.loading = false
      this.productRating = Math.round(res.rating.rate)
      this.stars = Array(this.productRating).fill(1).map((x, i) => i + 1);
      this.emptyStars = Array(5 - this.productRating).fill(1).map((x, i) => i + 1);
    }, error => {
      this.loading = false
      alert(error)
    })
  }
}
