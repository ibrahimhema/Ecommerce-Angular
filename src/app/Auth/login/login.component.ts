import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { Login } from 'src/app/Shared/login';
import { responseDataForUser } from 'src/app/Shared/responseDataForUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData: Login;
  responsedUser!: responseDataForUser;
  eorrors: string = '';
  constructor(private _serviceLogin: LoginService, private router: Router) {
    this.loginData = new Login('', '', 'password');
  }

  ngOnInit(): void {}
  onSubmit() {
    this._serviceLogin.Login(this.loginData).subscribe(
      (data) => {
        console.log(data);
        this.responsedUser = new responseDataForUser(
          data.access_token,
          data.userName,
          data.role,
          data.userId
        );
        this.saveDataToLaocalStorage();
        this.router.navigate(['/homePage']);
      },
      (error) => {
        this.eorrors = error.error.error_description;
      }
    );
  }
  saveDataToLaocalStorage(){
    localStorage.setItem("access_token",this.responsedUser.access_token)
    localStorage.setItem("userName",this.responsedUser.userName)
    localStorage.setItem("userId",this.responsedUser.userId)
    localStorage.setItem("role",this.responsedUser.role)
    this._serviceLogin.changeMessage('')
  }
}
