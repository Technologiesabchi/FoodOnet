import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productName: string = '';
  productHsnCode: string = '';
  productCategory: string = '';
  productSubCategory: string = '';
  product: string = '';
  productList: any[] = [];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.productName = 'product';
    this.productSearchList();
  }

  productSearchList() {
    $('.overlay').show();
    let queryParams = `?search=${this.productName}`;
    this.authService.searchProduct(queryParams).subscribe((res: any) => {
      $('.overlay').hide();
      this.productList = res.data;
    }, (err: any) => {
      $('.overlay').hide();
    })
  }
}
