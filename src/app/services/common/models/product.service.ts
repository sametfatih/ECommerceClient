import { Injectable } from '@angular/core';
import { Create_Product } from 'src/app/contracts/product/create_product';
import { HttpclientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpclientService) { }

  create(product : Create_Product, successCallBack? : any) {
    this.httpClientService.post({
      controller:"products"
    },product).subscribe(result=>{
      successCallBack();
    })
  }
}
