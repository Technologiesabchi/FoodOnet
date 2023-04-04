import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'https://api.foodonet.in/v1';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  pinlocation = {};
  selectedEmp = null;
  constructor(private http: HttpClient, public router: Router) { }
  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/signup`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }


  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/auth/login`, user)
      .subscribe((res: any) => {
        // console.log(res);

        localStorage.setItem('access_token', res.access_token);
        this.getUserProfile(res).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['superadmin_dashboard']);
          $('.login-dropdown').hide();
          $('.overlay').hide();
        });

      }, error => { this.handleError(error); $('.overlay').hide(); });

  }



  //Pincode Search
  getPin(pin: any): Observable<User> {
    return this.http
      .get<User>(this.endpoint + '/vendor/check-pincode/' + pin)
      .pipe(tap((data: any) => console.log(JSON.stringify(data))), catchError(this.handleError));
  }

  //Send OTP
  sendOTP(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/sendotp`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  //validate Email OTP
  verifyEmailOTP(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/validateotp`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  //validate Mobile OTP
  verifyMobOTP(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/validateotp`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }


  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['admin']);
    }
  }
  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user/my-details`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  /** Product Management API Start */
  addProduct(productList: any): Observable<any> {
    let api = `${this.endpoint}/product/add`;
    return this.http.post(api, productList).pipe(catchError(this.handleError));
  }

  searchProduct(searchObj: any): Observable<any> {
    let api = `${this.endpoint}/product/search${searchObj}`;
    return this.http
      .get(api)
      .pipe(tap(), catchError(this.handleError));
  }

  deleteProduct(id: any): Observable<any> {
    let api = `${this.endpoint}/product/remove/${id}`;
    return this.http.delete(api).pipe(catchError(this.handleError));
  }

  modifyProduct(productList: any, id: any): Observable<any> {
    let api = `${this.endpoint}/product/modify/${id}`;
    return this.http.put(api, productList).pipe(catchError(this.handleError));
  }
  /** Product Management API End */

  /** User Management API Start */
  addAdminUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data"
      })
    };
    let api = `${this.endpoint}/user/create-admin`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  searchAdmin(empId: string, userType: string): Observable<any> {
    let api = `${this.endpoint}/user/search?search_text=${empId}&user_type=${userType}`;
    return this.http
      .get(api)
      .pipe(tap(), catchError(this.handleError));
  }

  editAdminUser(user: any, empId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data"
      })
    };
    let api = `${this.endpoint}/user/update-admin/${empId}`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  /** User Management API End */


  // Error
  handleError(error: HttpErrorResponse) {
    $('.show_err').show();
    $('.overlay').hide();
    let msg = '';
    let msg_server = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
      console.log(msg);
      $('.show_err').html(msg);

    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
      msg_server = error.error.message;
      console.log(msg);

      $('.show_err').html(msg_server);
      if (error.status >= 400) {
        $('.show_err').html('Error: Username or Password Mismatch!');
      }

      if (msg_server == '\"body\" does not match any of the allowed types') {
        const err_msg_1 = 'Error: Please Provide Valid Email and Mobile No!';

      }

      $('.vendor_signup_error').html(msg_server);
      $('.mob_verification, .email_verification').prop('disabled', true);



      /* if(msg_server == 'Email or Mobile not verified'){
        $('.vendor_signup_error').html('Error: '+ msg_server);
        $('.mob_verification, .email_verification').prop('disabled', true);
        $('.verify_otp').prop('disabled', true);
       
      } */
      if (msg_server == '\"body\" does not match any of the allowed types') {
        $('.vendor_signup_error').html('Error: Please Provide Valid Email and Mobile No!');
        $('.mob_verification, .email_verification').prop('disabled', true);
        $('.verify_otp').prop('disabled', true);
      }
      $('.vendor_signup_error').show();
      $('.otp_success_msg').hide();
      //$('.vendor_signup_error').html(msg_server);



    }
    return throwError(() => msg);
  }
}
