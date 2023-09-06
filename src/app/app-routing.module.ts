import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ContactComponent } from './shared/contact/contact.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  {path:"home" , component:HomeComponent},
  {path:"products" , component:AllProductsComponent},
  {path:"details/:id" , component:ProductsDetailsComponent},
  {path:"cart" , component:CartComponent},
  {path:"contact" , component:ContactComponent},
  {path:'' , component:HomeComponent},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
