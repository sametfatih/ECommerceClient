import { SocialUser } from '@abacritt/angularx-social-login/public-api';
import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpclientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpclientService,private toastrService: CustomToastrService) { }

  async create(user: User,callback?:()=> void): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    const result : Create_User = await firstValueFrom(observable) as Create_User;
    callback();
    return result 
  }
  async login(usernameOrEmail: string, password: string,
    callback?: () => void): Promise<any> {
    
      const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      action: "login",
      controller: "users"
    }, {
      usernameOrEmail,
      password
    });

    const tokenResponse : TokenResponse = await firstValueFrom(observable)as TokenResponse;

    if(tokenResponse){

      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Oturum başarıyla açılmıştır.","Giriş Başarılı",{
        messageType:ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callback();
  }

  async googleLogin(user : SocialUser, callback?: () => void){
    const observable : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
      action: "google-login",
      controller: "users"
    }, user); 

    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if(tokenResponse){
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);

      this.toastrService.message("Google ile oturum açma başarılı.","Giriş Başarılı",{
        messageType:ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    }
    callback();
  } 
}
