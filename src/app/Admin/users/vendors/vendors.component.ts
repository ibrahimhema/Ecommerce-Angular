import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { User } from 'src/app/Shared/User';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  Vendors: User[];

  constructor(
    private _usersService: UsersService
  ) { }

  ngOnInit(): void {
    this._usersService.GetVendors().subscribe(
      d => this.Vendors = d
    )
  }

}
