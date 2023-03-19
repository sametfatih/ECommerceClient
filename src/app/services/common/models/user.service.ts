import { Injectable } from '@angular/core';
import { first, firstValueFrom, Observable } from 'rxjs';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { HttpclientService } from '../httpclient.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpclientService) { }

  async create(user: User,callback?:()=> void): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "users"
    }, user);

    const result : Create_User = await firstValueFrom(observable) as Create_User;
    callback();
    return result 
  }
  async login(usernameOrEmail: string, password: string,
    callback?: () => void): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      action: "login",
      controller: "users"
    }, {
      usernameOrEmail,
      password
    });

    await firstValueFrom(observable);
    callback();
  }
}
