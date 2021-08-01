import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { UsersService } from 'src/app/Services/users.service';
import { Register } from 'src/app/Shared/register';
import { User } from 'src/app/Shared/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerData: Register;
  imageUrl: any = './assets/images/def.png';
  fileToUpload!: File;
  isEdit: boolean = false;
  user: User;
  register = true;

  constructor(
    private _serviceLogin: LoginService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UsersService,
    private _router: Router
    ) {
    
  }

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.paramMap.get('id') == null){
      this.registerData = new Register('', '', '', null, '', '', '', '','');
      this.isEdit = false;
    }
    else{
      let id = this._activatedRoute.snapshot.paramMap.get('id')!;
      this._userService.GetById(id).subscribe(
        d => {
          this.user = d;
          this.registerData = new Register(d.FirstName, d.LastName, d.Username, null, d.Email, '', '', '', d.Address);
          this.isEdit = true;
          this.imageUrl = `http://localhost:9602/Content/Imgs/Users/${d.Photo}`
          this.register = false;
        },
        err => {

        }
      )
    }
  }




  
  onSubmit() {
    this.registerData.Photo = this.fileToUpload;

    if (!this.isEdit){
      this._serviceLogin.Register(this.registerData).subscribe(
        (data) => {
          console.log(data);

          this._router.navigate(["/homePage"])
        },
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      let id: string = localStorage.getItem('userId')!;
      this.user.FirstName = this.registerData.FirstName;
      this.user.LastName  = this.registerData.LastName;
      this.user.Address   = this.registerData.Address;

      this._serviceLogin.EditProfile(this.user, this.registerData.Photo).subscribe(
        (data) => {
          console.log(data);

          this._router.navigate(["/homePage/profile"])
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }



  fileHandle(file: any) {
    this.fileToUpload = file.files.item(0);

    var filereader = new FileReader();
    filereader.onload = (event) => {
      this.imageUrl = event.target?.result;
      console.log(this.imageUrl);
    };
    filereader.readAsDataURL(this.fileToUpload);
  }
}
