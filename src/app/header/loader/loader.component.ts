import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor(
    public _loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

}
