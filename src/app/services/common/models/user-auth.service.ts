import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpclientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpclientService, private toastrService: CustomToastrService) { }

  async login(usernameOrEmail: string, password: string,
    callback?: () => void): Promise<any> {

    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, {
      usernameOrEmail,
      password
    });

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {

      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Oturum başarıyla açılmıştır.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callback();
  }

  async googleLogin(user: SocialUser, callback?: () => void) {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      controller: "auth",
      action: "google-login"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Google ile oturum açma başarılı.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callback();
  }

  async facebookLogin(user: SocialUser, callback?: () => void) {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post({
      controller: "auth",
      action: "facebook-login"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Facebook ile oturum açma başarılı.", "Giriş Başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callback();
  }
}
