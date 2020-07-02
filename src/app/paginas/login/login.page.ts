import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit() {
  }
  async loginClick(email, password){
    try{
      const user = await this.authSvc.login(email.value, password.value);
      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      }
    }
    catch (error){console.log('Error', error);
    }
  }

  async googleLoginClick(email, password){
    try{
      const user = await this.authSvc.loginGoogle();
      if(user){
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);
      
      }
    }
    catch (error){console.log('Error:', error);
    }
  }

/*  async facebookLoginClick(email, password){
    try{
      const user = await this.authSvc.loginFacebook();
      if(user){
        //todo: CheckEmail
        console.log('user', user);
      }
    }
    catch (error){console.log('Error:', error);
    }
  } */

//redirec ->
redirectUser(isVerified: boolean): void{
if(isVerified){
  this.router.navigate(['admin']);
}else {
  this.router.navigate(['verify-email']);
}
}

}
