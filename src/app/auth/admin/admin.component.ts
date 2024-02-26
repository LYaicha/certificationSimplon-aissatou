import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private router: Router, private http: HttpClient) { }
  login() {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    console.log('adl');
    const loginData: any = {
      email: email,
      password: password
    };
    console.log(loginData);
    

    this.http.post("http://127.0.0.1:8000/api/auth/login", loginData).subscribe({
      next: (response: any) => {
        console.log(response);
        const token = response.token;
        localStorage.setItem('token', token);
        this.router.navigate(['dashboard']);
      },
      error: (error: any) => {
        console.error(error);
        console.log('bap');
    

        
      }
    });
    alert('adl')
  }

}




