import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';
import { envireonment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  
  raiseDateEmitterEvent(data:boolean){
    this.dataEmitter.next(data)
  }
  dataEmitter=new BehaviorSubject(false)
  constructor(private http:HttpClient) { }

  createNewCart(model:any){
    return this.http.post(envireonment.baseApi + 'carts' , model)
  }
}
