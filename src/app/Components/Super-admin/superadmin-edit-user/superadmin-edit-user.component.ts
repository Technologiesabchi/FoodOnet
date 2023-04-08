import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
declare var $: any;

@Component({
  selector: 'app-superadmin-edit-user',
  templateUrl: './superadmin-edit-user.component.html',
  styleUrls: ['./superadmin-edit-user.component.css']
})
export class SuperadminEditUserComponent implements OnInit {
  url = "";
  imageData: any = null;
  empID: any;

  editAdminForm!: FormGroup;

  selectFile(event: any) {
    if (event.target.files) {
      this.imageData = event.target.files[0];
      this.editAdminForm.value.file = event.target.files[0];
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.url = event.target.result
      }

    }


  }
  constructor(private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    let emp: any = this.authService.selectedEmp;
    this.url = emp?.user_extra_details.profile_image;
    this.empID = emp?.user_extra_details.emp_code;

    this.editAdminForm = this.formBuilder.group({
      emp_code: [{ value: this.empID, disabled: true }, Validators.required],
      fname: [emp?.name.split(' ')[0], Validators.required],
      lname: [emp?.name.split(' ')[1], Validators.required],
      email: [emp?.email, [Validators.required, Validators.email]],
      mobile: [emp?.mobile, Validators.required],
      pan: [emp?.user_extra_details.pan, Validators.required],
      adhaar: [emp?.user_extra_details.adhaar, Validators.required],
      addr_line1: [emp?.address.line1, Validators.required],
      addr_line2: [emp?.address.line2],
      police_station: [emp?.address.police_station, Validators.required],
      post_office: [emp?.address.post_office, Validators.required],
      city: [emp?.address.line1, Validators.required],
      district: [emp?.address.district, Validators.required],
      state: [emp?.address.state, Validators.required],
      country: [emp?.address.country, Validators.required],
      pincode: [emp?.address.pincode, Validators.required]
      // file: [emp?.name, Validators.required]
    });
  }

  onSubmit() {
    console.log(this.editAdminForm.value)
    // stop here if form is invalid
    if (this.editAdminForm.invalid) {
      return;
    }
    this.imageData = (!!this.imageData) ? this.imageData : this.url;
    let fd = new FormData();
    fd.append('name', `${this.editAdminForm.value.fname} ${this.editAdminForm.value.lname}`);
    fd.append('email', this.editAdminForm.value.email);
    fd.append('mobile', this.editAdminForm.value.mobile);
    fd.append('pan', this.editAdminForm.value.pan);
    fd.append('adhaar', this.editAdminForm.value.adhaar);
    fd.append('addr_line1', this.editAdminForm.value.addr_line1);
    fd.append('addr_line2', this.editAdminForm.value.addr_line2);
    fd.append('police_station', this.editAdminForm.value.police_station);
    fd.append('post_office', this.editAdminForm.value.post_office);
    fd.append('city', this.editAdminForm.value.city);
    fd.append('district', this.editAdminForm.value.district);
    fd.append('state', this.editAdminForm.value.state);
    fd.append('country', this.editAdminForm.value.country);
    fd.append('pincode', this.editAdminForm.value.pincode);
    fd.append('file', this.imageData);
    // if (this.imageData) {
    //   fd.append('file', this.imageData);
    // }

    $('.overlay').show();
    this.authService.editAdminUser(fd, this.empID).subscribe((res: any) => {
      $('.overlay').hide();
      $("#editAdminSuccessModal").modal('show');
    }, (err: any) => {
      $('.overlay').hide();
      let errMsg = err.split('\n')[1].split(':')[1];
      alert(errMsg.trim())
      // console.log('API failed :: ', errMsg.trim());
    })
  }

  deleteUser() {
    $('.overlay').show();
    this.authService.deleteAdmin(this.empID).subscribe((res: any) => {
      $('.overlay').hide();
      this.onClose();
    }, (err: any) => {
      $('.overlay').hide();
    })
  }

  onClose() {
    window.location.reload();
  }

}
