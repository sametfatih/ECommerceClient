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

  async create(user:User) : Promise<Create_User>{
    const observable : Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller:"users"
    },user);
    return await firstValueFrom(observable) as Create_User;
  }
}
