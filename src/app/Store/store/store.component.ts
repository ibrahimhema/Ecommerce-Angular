import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/Services/store.service';
import { Store } from 'src/app/Shared/Store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {


  stores: Store[] = []

  constructor(
    private _storeService: StoreService
  ) { }

  ngOnInit(): void {
    this._storeService.GetStores().subscribe(
      d => {this.stores = d; console.log(d)}
    )
  }

}
