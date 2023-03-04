import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { List_Product } from '../../../../contracts/product/list_product';
import { AlertifyService, MesageType, Position } from '../../../../services/admin/alertify.service';
import { ProductService } from '../../../../services/common/models/product.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private productService: ProductService) {
    super(spinner);
  }
  
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate'];

  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts : {
      totalCount: number, products: List_Product[]
    } = await this.productService.read(
      this.paginator ? this.paginator.pageIndex:0,
      this.paginator ? this.paginator.pageSize:5,
      () => this.hideSpinner(SpinnerType.BallAtom),
      errorMessage =>
      this.alertify.message(errorMessage, { messageType: MesageType.Error,
      position:Position.TopRight })
    );

    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length=allProducts.totalCount;
    
  }

  async pageChanged(){
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }
}
