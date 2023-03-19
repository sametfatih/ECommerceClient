import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr : ToastrService) { }

  message(message:string,title:string,options:Partial<ToastrOptions>){
    this.toastr[options.messageType](message,title,{positionClass:options.position});
  }
}

export class ToastrOptions{
  messageType:ToastrMessageType = ToastrMessageType.Success;
  position?:ToastrPosition = ToastrPosition.TopRight;
}

export enum ToastrMessageType{
  Success="success",
  Info="info",
  Warning="warning",
  Error="error"
}
export enum ToastrPosition{
  TopRight="toast-top-right",
  TopLeft="toast-top-left",
  TopCenter="toast-top-center",
  TopFullWidth="toast-top-full-width",
  BottomRight="toast-bottom-right",
  BottomLeft="toast-bottom-left",
  BottomCenter="toast-bottom-center",
  BottomFullWidth="toast-bottom-full-width"
}