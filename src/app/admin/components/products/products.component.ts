import { Component, OnInit, ViewChild } from '@angular/core';
import { Create_Product } from 'src/app/contracts/product/create_product';
import { HttpclientService } from 'src/app/services/common/httpclient.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService: HttpclientService) { }
  ngOnInit(): void {
    
  }
@ViewChild(ListComponent) listComponents : ListComponent

  createdProduct(createdProduct:Create_Product){
      this.listComponents.getProducts();
  }
}
