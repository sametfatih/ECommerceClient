import { Component, OnInit, ViewChild } from '@angular/core';
import { Create_Product } from 'src/app/contracts/product/create_product';
import { HttpclientService } from 'src/app/services/common/httpclient.service';
import { ListComponent } from './list/list.component';
declare var $: any

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService: HttpclientService) { }
  ngOnInit(): void {

  }
  @ViewChild(ListComponent) listComponents: ListComponent

  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }

  changeText() {
    if ($("#topText").text() == "Ürün Ekle") {
      $("#topIcon1").hide();
      $("#topIcon2").show();
      $("#topButton").css("background-color", "#c93636");
      $("#topText").text("İptal Et")
      
    }else{
      $("#topIcon2").hide();
      $("#topIcon1").show();
      $("#topButton").css("background-color", "#36c956");
      $("#topText").text("Ürün Ekle")
      
    }
  }
}
