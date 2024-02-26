import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
// import Swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent {
  registerForm!:FormGroup
  error!:string 
  constructor(private fb: FormBuilder, private authService: AuthService, private route: Router){
this.registerForm=this.fb.group({
  nom:['',Validators.required],
  email:['',[Validators.required, Validators.email]],
  password:['',[Validators.required,Validators.min(8),Validators.max(20)]],
  telephone:['',Validators.required],
  matricule:['',Validators.required],
  structure:['',Validators.required],
  service:['',Validators.required],
})
  }
  submitForm(){
    console.log(this.registerForm.value);
    this.authService.registerPs(this.registerForm.value).subscribe((response)=>{
      Swal.fire({
        icon: 'success',
        title: 'Incription réussie',
        text: 'Veuillez attendre la validation d l admin pour vous connecter!',
      });
      this.route.navigateByUrl('/login')
      console.log(response);
    },
    (error)=>{
      console.log(error.error.errors.email);
      this.error=error.error.errors.email
      
    })
  }
}
