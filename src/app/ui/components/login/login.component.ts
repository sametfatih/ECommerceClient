import { SocialUser, SocialAuthService, FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserAuthService } from "src/app/services/common/models/user-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(private userAuthService: UserAuthService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
    private socialAuthService: SocialAuthService) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user: SocialUser) => {
      console.log(user)
      this.showSpinner(SpinnerType.BallAtom);
      switch (user.provider) {
        case "GOOGLE":
          await userAuthService.googleLogin(user,()=>{});
          break;
        case "FACEBOOK":
          await userAuthService.facebookLogin(user,()=>{});
          break;
      };
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate([""]);
        }
      });
      this.hideSpinner(SpinnerType.BallAtom);
    });

  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.userAuthService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate([""]);
        }

      });

      this.hideSpinner(SpinnerType.BallAtom);
    });
  }

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
