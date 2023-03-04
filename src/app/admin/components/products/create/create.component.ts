import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/product/create_product';
import { AlertifyService, MesageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(
    spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private productService: ProductService) {
    super(spinner)
  }

  @Output() createdProduct : EventEmitter<Create_Product> = new EventEmitter();

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement) {

    this.showSpinner(SpinnerType.BallAtom);
    
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    

    this.productService.create(create_product, () => {
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün başarıyla eklenmiştir.", { messageType: MesageType.Success, position: Position.TopRight });
      this.createdProduct.emit(create_product)
    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismisOthers: true,
        messageType: MesageType.Error,
        position: Position.TopRight
      })
    });
  
  }

  ngOnInit(): void {

  }
}
