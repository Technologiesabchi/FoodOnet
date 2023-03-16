import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
declare var $: any;

@Component({
  selector: 'app-add-new-products',
  templateUrl: './add-new-products.component.html',
  styleUrls: ['./add-new-products.component.css']
})
export class AddNewProductsComponent implements OnInit {

  addProductForm!: FormGroup;
  apiErrMsg: string = '';
  imageData: any;
  categoryList: any = {
    "Category1": ["Subcat1", "Subcat2"],
    "Category2": ["Subcat3"]
  };
  hsnCodeList: any = {
    "code1": {
      "sgst": 20,
      "cgst": 18
    },
    "code2": {
      "sgst": 8,
      "cgst": 5
    }
  }

  constructor(private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['grocery', Validators.required],
      image_url: [''],
      category: ['', Validators.required],
      sub_category: ['', Validators.required],
      hsn_code: ['', Validators.required],
      commission: [0, Validators.required],
      status: ['ACTIVE', Validators.required],
    });
  }

  selectFile(event: any) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.imageData = event.target.result
      }

    }
  }

  onSubmit() {
    let params: any = {
      product_list: []
    };
    params.product_list.push(this.addProductForm.value);
    params.product_list[0].image_url = this.imageData;

    if (this.addProductForm.invalid) {
      return;
    }

    $('.overlay').show();
    this.authService.addProduct(params).subscribe((res: any) => {
      $('.overlay').hide();
      $("#addProductSuccessModal").modal('show');
      this.addProductForm.reset();
      this.imageData = '';
    }, (err: any) => {
      $('.overlay').hide();
      console.log('API failed :: ', err);
    })


  }

}
