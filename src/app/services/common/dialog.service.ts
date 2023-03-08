import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogParameters : Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width:dialogParameters.options?.width,
      height:dialogParameters.options?.height,
      position:dialogParameters.options?.position,
      data: dialogParameters.data.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == dialogParameters.data.Yes)
          dialogParameters.afterClosed();
    });
  }
}

export class DialogParameters{
  componentType: ComponentType<any>;
  data: any;
  afterClosed:() => void;
  options?: Partial<DialogOptions>;
}

export class DialogOptions{
  width?:string;
  height?:string;
  position?:DialogPosition;

}