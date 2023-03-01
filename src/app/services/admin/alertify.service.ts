import { Injectable } from '@angular/core';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string , oprions : Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay',oprions.delay);
    alertify.set('notifier', 'position',oprions.position);
    const msj = alertify[oprions.messageType](message);
    if(oprions.dismisOthers)
      msj.dismisOthers();

  }
  dismiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType:MesageType = MesageType.Message;
  position:Position = Position.BottomRight;
  delay:number = 3;
  dismisOthers:boolean = false;
}

export enum MesageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position{
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft  = "bottom-left"
}