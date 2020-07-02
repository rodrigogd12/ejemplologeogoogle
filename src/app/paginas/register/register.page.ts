import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(email, password) {
    try {
      const user = await this.authSvc.register(email.value, password.value);
      if (user) {

        console.log('user:', user);
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redirectUser(isVerified);

      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  redirectUser(isVerified: boolean): void{
    if(isVerified){
      this.router.navigate(['admin']);
    }else {
      this.router.navigate(['verify-email']);
    }
    }
  }
