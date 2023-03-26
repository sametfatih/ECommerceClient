import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {

      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlemi yapmak için yetkiye ihtiyacınız var.","Yetersiz Yetki!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilemiyor.","Sunucu Hatası!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz bir istek yapıldı.","Geçersiz istek!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Böyle bir sayfa bulunamadı.","Sayfa Bulunamadı!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata oluştu.","Hata!",{
            messageType: ToastrMessageType.Warning,
            position: ToastrPosition.BottomCenter
          });

          break;

      }

      return of(error);
    }));
  }
}
