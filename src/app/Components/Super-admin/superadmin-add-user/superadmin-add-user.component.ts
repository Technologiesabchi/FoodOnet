import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
declare var $: any;

@Component({
  selector: 'app-superadmin-add-user',
  templateUrl: './superadmin-add-user.component.html',
  styleUrls: ['./superadmin-add-user.component.css']
})
export class SuperadminAddUserComponent implements OnInit {
  url = "assets/images/User-Profile.png";
  imageData: any = null;

  addAdminForm!: FormGroup;

  selectFile(event: any) {
    if (event.target.files) {
      this.imageData = event.target.files[0];
      this.addAdminForm.value.file = event.target.files[0];
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url = event.target.result
      }

    }


  }

  constructor(private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.addAdminForm = this.formBuilder.group({
      emp_code: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      pan: ['', Validators.required],
      adhaar: ['', Validators.required],
      addr_line1: ['', Validators.required],
      addr_line2: [''],
      police_station: ['', Validators.required],
      post_office: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required]
      // file: ['', Validators.required]
    });

  }

  onSubmit() {
    // stop here if form is invalid
    if (this.addAdminForm.invalid) {
      return;
    }
    let fd = new FormData();
    fd.append('emp_code', this.addAdminForm.value.emp_code);
    fd.append('name', `${this.addAdminForm.value.fname} ${this.addAdminForm.value.lname}`);
    fd.append('email', this.addAdminForm.value.email);
    fd.append('mobile', this.addAdminForm.value.mobile);
    fd.append('pan', this.addAdminForm.value.pan);
    fd.append('adhaar', this.addAdminForm.value.adhaar);
    fd.append('addr_line1', this.addAdminForm.value.addr_line1);
    fd.append('addr_line2', this.addAdminForm.value.addr_line2);
    fd.append('police_station', this.addAdminForm.value.police_station);
    fd.append('post_office', this.addAdminForm.value.post_office);
    fd.append('city', this.addAdminForm.value.city);
    fd.append('district', this.addAdminForm.value.district);
    fd.append('state', this.addAdminForm.value.state);
    fd.append('country', this.addAdminForm.value.country);
    fd.append('pincode', this.addAdminForm.value.pincode);
    fd.append('file', this.imageData);

    $('.overlay').show();
    this.authService.addAdminUser(fd).subscribe((res: any) => {
      $('.overlay').hide();
      if (res && res.url) {
        $("#addAdminSuccessModal").modal('show');
        this.addAdminForm.reset();
        this.url = "assets/images/User-Profile.png";
        this.imageData = null;
        window.location.reload();
      } else {
        alert('Please fill all fields.');
      }
    }, (err: any) => {
      $('.overlay').hide();
      let errMsg = err.split('\n')[1].split(':')[1];
      alert(errMsg.trim())
      // console.log('API failed :: ', errMsg.trim());
    })


  }

}
