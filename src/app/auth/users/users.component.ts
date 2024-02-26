import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
export const emailValidator = Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  registerForm!:FormGroup
  FormGroup: any;
  error!:string 
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router){
  this.registerForm=this.fb.group({
  nom:['',Validators.required],
  email:['',[Validators.required, Validators.pattern]],
  password:['',[Validators.required,Validators.min(8),Validators.max(20)]],
  telephone:['',Validators.required],
  image:[''],
})
  }
  submitForm(){
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe((response)=>{
      this.route.navigateByUrl('/monCycle')
      console.log(response);
    },
  
  (error)=>{
    console.log(error.error.errors.email);
    this.error=error.error.errors.email
    
  })
  

  }

}
