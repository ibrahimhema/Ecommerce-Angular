import { Component, OnInit } from '@angular/core';
import { ModalService } from '../Services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    private _modelService: ModalService
  ) { }

  ngOnInit(): void {
  }


  Confirmed(){
    this._modelService.DeleteConfirmed();
  }

  Dismiss(){
    this._modelService.DeleteDismissed();
  }
}

