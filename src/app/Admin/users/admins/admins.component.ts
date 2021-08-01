import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/Services/modal.service';
import { UsersService } from 'src/app/Services/users.service';
import { User } from 'src/app/Shared/User';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {


  Admins: User[];
  raisedModal = false;
  idForDeleted = "";


  constructor(
    private _usersService: UsersService,
    private _modalService: ModalService
  ) { }

  ngOnInit(): void {
    this._usersService.GetAdmins().subscribe(
      d => this.Admins = d
    );
  }

  DeleteAdmin(id: string){
    this._usersService.DeleteAdmin(id).subscribe(
      d => {
        this.Admins = this.Admins.filter(function(admin){
          return admin.Id != id
        });
        this._usersService.DeleteAdminUpdate.next(id);
      },
      err => {
        
      }
    )
  }

  ConfirmDelete(id: string) {
    this.raisedModal = true;
    this.idForDeleted = id;
    this._modalService.openPopUp("Delete","Are you Sure you want to Delete this Admin")
    this._modalService.DeleteObserver().subscribe(
      d => {
        if (d){
          if (this.raisedModal){
            this.DeleteAdmin(this.idForDeleted);
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
