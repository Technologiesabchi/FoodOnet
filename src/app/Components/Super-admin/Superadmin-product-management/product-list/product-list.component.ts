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

  selectedProdCat: string = '';
  selectedProdSubCat: string = '';
  selectedProdName: string = '';
  selectedProdDesc: string = '';
  selectedProdHsnCode: string = '';
  imageData: any = '';

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
    this.imageData = p.image_url;
    this.selectedProdCat = p.category;
    this.selectedProdName = p.name;
    this.selectedProdSubCat = p.sub_category;
    this.selectedProdHsnCode = p.hsn_code;
    this.selectedProdDesc = p?.description;
  }

  deleteProduct() {
    $('.overlay').show();
    this.authService.deleteProduct(this.selectedData._id).subscribe((res: any) => {
      this.selectedData = null;
      $('.overlay').hide();
      this.productSearchList(this.selectedQueryParams);
    }, (err: any) => {
      $('.overlay').hide();
    })
  }

  selectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.imageData = event.target.result;
        // this.selectedData.image_url = event.target.result;
      }

    }
  }

  modifyProduct() {
    let params = {
      name: this.selectedProdName,
      description: this.selectedProdDesc,
      image_url: this.imageData,
      category: this.selectedProdCat,
      sub_category: this.selectedProdSubCat,
      hsn_code: this.selectedProdHsnCode,
      commission: this.selectedData.commission,
      status: this.selectedData.status
    }
    $('.overlay').show();
    this.authService.modifyProduct(params, this.selectedData._id).subscribe((res: any) => {
      this.selectedData = null;
      $('.overlay').hide();
      this.productSearchList(this.selectedQueryParams);
    }, (err: any) => {
      $('.overlay').hide();
    })
  }
}
