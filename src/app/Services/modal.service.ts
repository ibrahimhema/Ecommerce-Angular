import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  private DeleteConfirmer = new Subject<boolean>();


  openPopUp(title: string, body: string, addAdmin?: boolean) {
    $("#modalTitle").html(title);
    $("#modalBody").html(body);
    if (addAdmin != null && addAdmin){
      $("#modalButton").html("Add");
    }else {
      $("#modalButton").html("Delete");
    }

    $("#myModal").modal()
  }

  DeleteConfirmed(){
    this.DeleteConfirmer.next(true);
  }

  DeleteDismissed(){
    this.DeleteConfirmer.next(false);
  }

  DeleteObserver(){
    return this.DeleteConfirmer.asObservable();
  }


}
