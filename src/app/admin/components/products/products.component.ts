import { Component, OnInit } from '@angular/core';
import { HttpclientService } from 'src/app/services/common/httpclient.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private httpClientService: HttpclientService) { }
  ngOnInit(): void {
    
  }
}
