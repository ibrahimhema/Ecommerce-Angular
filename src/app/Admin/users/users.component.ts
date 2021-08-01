import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { UsersService } from 'src/app/Services/users.service';
import { User } from 'src/app/Shared/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  Users: User[];
  raisedModal= false;
  idForAddAdmin = "";

  constructor(
    private _usersService: UsersService,
    private _modalService: ModalService
  ) { }

  ngOnInit(): void {
    this._usersService.GetUsers().subscribe(
      d => this.Users = d
    )

    this._usersService.DeleteAdminUpdate.subscribe(
      id => {
        this._usersService.GetById(id).subscribe(
          u => {
            this.Users.push(u);
          }
        )
      }
    )
  }

  MakeAdmin(id: string){
    this._usersService.MakeAdmin(id).subscribe(
      d => {
        this.Users = this.Users.filter(
          function(user){
            return user.Id != id;
          }
        )
      },
      err => {

      }
    )
  }


  ConfirmAdd(id: string) {
    this.raisedModal = true;
    this.idForAddAdmin = id;
    this._modalService.openPopUp("Add","Are you Sure you want to Make this User and Admin", true)
    this._modalService.DeleteObserver().subscribe(
      d => {
        if (d){
          if (this.raisedModal){
            this.MakeAdmin(this.idForAddAdmin);
            this.raisedModal = false;
          }
        }
        else{
          this.raisedModal = false;
        }
      }
    )
  }



}
