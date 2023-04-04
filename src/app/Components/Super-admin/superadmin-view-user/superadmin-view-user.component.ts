import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-superadmin-view-user',
  templateUrl: './superadmin-view-user.component.html',
  styleUrls: ['./superadmin-view-user.component.css']
})
export class SuperadminViewUserComponent implements OnInit {

  empId: string = '';
  userType: string = '';
  empList: any[] = [];
  selectedEmp: any = null;

  constructor(private router: Router, public authService: AuthService) { }

  redirectToedituser() {
    this.router.navigate(['/superadmin_edit_user'], { skipLocationChange: true });
  }

  ngOnInit(): void {
  }

  searchUser() {
    if (!!this.empId && !!this.userType) {
      $('.overlay').show();
      this.authService.searchAdmin(this.empId, this.userType).subscribe((res: any) => {
        this.empList = res;
        $('.overlay').hide();
      }, (err: any) => {
        $('.overlay').hide();
        let errMsg = err.split('\n')[1].split(':')[1];
        alert(errMsg.trim())
        // console.log('API failed :: ', errMsg.trim());
      })
    }
  }

  selectUser(emp: any) {
    this.selectedEmp = emp;
    this.authService.selectedEmp = emp;
  }

}
