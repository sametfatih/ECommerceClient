import { animate } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MesageType, Position } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpclientService } from 'src/app/services/common/httpclient.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpclientService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService,
    private dialogService: DialogService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer");
    img.width = 32;
    img.height = 32;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState,
      afterClosed: async ()=>{
        this.spinner.show(SpinnerType.BallAtom);
        const td: HTMLTableCellElement = this.element.nativeElement;
        this.httpClientService.delete({
          controller: this.controller,
        },this.id).subscribe(data =>{
          $(td.parentElement)
          .animate({
            opacity:"0",
            left:"+=50",
            height:"toggle"
          },700, () => {
            this.callback.emit();
            this.alertify.message("Ürün başarıyla silinmiştir.",{
              messageType:MesageType.Warning,
              dismisOthers: true,
              position:Position.TopRight
            });
          });
        },errorResponse=>{
          this.spinner.hide(SpinnerType.BallAtom);
          this.alertify.message("Ürün silme işlemi başarısız.",{
            messageType:MesageType.Error,
            dismisOthers: true,
            position:Position.TopRight
          });
        })
      }
    });  
  }
}

