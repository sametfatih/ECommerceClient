import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product_Image } from 'src/app/contracts/product/list_product_image';
import { AlertifyService, MesageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
declare var $: any

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataId: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {
    super(dialogRef);

  }

  productImageList: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.productImageList = await this.productService.readImages(this.dataId as string,
      () => this.spinner.hide(SpinnerType.BallAtom)
    );
  }

  deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      options: {},
      afterClosed: ()=>{
        this.spinner.show(SpinnerType.BallAtom);
        this.productService.deleteImage(this.dataId as string, imageId,
          () => {
            this.spinner.hide(SpinnerType.BallAtom);
            var element = $(event.srcElement).parent().parent().parent().parent();
            element.animate({
              opacity: "0",
              left: "+=50",
              height: "toggle"
            }, 700, () => {
              this.alertify.message("Ürün resmi başarıyla silinmiştir.", {
                messageType: MesageType.Warning,
                dismisOthers: true,
                position: Position.TopRight
              });
            });
          }
        );
      },
    })


  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resmini seçin veya buraya sürükleyin..",
    isAdminPage: true,
    queryString: `id=${this.dataId}`
  }

}

export enum SelectProductImageState {
  Close
}