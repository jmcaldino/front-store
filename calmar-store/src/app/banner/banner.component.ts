import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  constructor() { }

  images: string[] = [
    'assets/images/web-en-contruccion.png',
    'assets/images/web-remodelacion.png',
    'assets/images/web-en-contruccion.png'
  ];

  ngOnInit(): void {
  }

}
