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
  selectedData: any = null;
  selectedQueryParams: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  searchyByName() {
    if (!!this.productName) {
      let queryParams = `?search=${this.productName}`;
      this.productSearchList(queryParams);
    } else {
      alert('Please enter something to search.')
    }

  }

  searchyByHsnCode() {
    if (!!this.productHsnCode) {
      let queryParams = `?search=${this.productHsnCode}`;
      this.productSearchList(queryParams);
    } else {
      alert('Please enter something to search.')
    }
  }

  searchyByDetails() {
    let searchParams = '';
    if (!!this.product) {
      searchParams = `search=${this.product}`;
    }
    if (!!this.productCategory) {
      if (!!searchParams) {
        searchParams = `${searchParams}&category=${this.productCategory}`;
      } else {
        searchParams = `category=${this.productCategory}`;
      }
    }
    if (!!this.productSubCategory) {
      if (!!searchParams) {
        searchParams = `${searchParams}&sub_category=${this.productSubCategory}`;
      } else {
        searchParams = `sub_category=${this.productSubCategory}`;
      }
    }
    if (!!searchParams) {
      let queryParams = `?${searchParams}`;
      this.productSearchList(queryParams);
    } else {
      alert('Please enter something to search.')
    }

  }

  productSearchList(queryParams: any) {
    this.selectedQueryParams = queryParams;
    $('.overlay').show();
    this.authService.searchProduct(queryParams).subscribe((res: any) => {
      $('.overlay').hide();
      this.productList = res.data;
    }, (err: any) => {
      $('.overlay').hide();
    })
  }

  selectProduct(p: any) {
    this.selectedData = p;
  }

  deleteProduct() {
    $('.overlay').show();
    this.authService.deleteProduct(this.selectedData._id).subscribe((res: any) => {
      $('.overlay').hide();
      this.productSearchList(this.selectedQueryParams);
    }, (err: any) => {
      $('.overlay').hide();
    })
  }
}
