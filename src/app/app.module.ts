import { CommonModule } from '@angular/common';
import { NgModule,} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    ProductsModule,
    CartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
