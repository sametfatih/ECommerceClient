import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/contracts/product';
import { HttpclientService } from 'src/app/services/common/httpclient.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService: HttpclientService) { }
  ngOnInit(): void {
    
    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));

    // this.httpClientService.post({
    //   controller:"products"
    // },{
    //   name:"Kalem",
    //   price:15,
    //   stock:10    
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "products"
    // }, {
    //   id: "0f8fad5b-d9cb-469f-a165-70867728950e",
    //   name: "Not Defteri",
    //   stock: 23,
    //   price: 42
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller : "products"
    // },"f4f40713-7e2c-4e76-2e16-08db1b54c9b4").subscribe();
  }
}
