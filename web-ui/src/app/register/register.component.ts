import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'ui-register',
  templateUrl: './register.component.html',
  styles: [
    `
      .register-form {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        roleType:['',Validators.required],
        adminCode:[''],
        password: [
          '',
          [Validators.required, Validators.pattern(this.passwordRegex)],
        ],
        confirmpassword: [
          '',
          [Validators.required, Validators.pattern(this.passwordRegex)],
        ],
      },
      { validator: matchingFeilds('password', 'confirmpassword') }
    );
  }
  ngOnInit(): void {
    this.registerForm.get('roleType').valueChanges
    .subscribe(value => {
      if(value ==='Admin') {
        this.registerForm.get('adminCode').setValidators(Validators.required)
      } else {
        this.registerForm.get('adminCode').clearValidators();
      }
    }
);
  }
  onSubmit() {
    // this.authService.register(this.registerForm.value);
    console.log(this.registerForm.value);
  }
}

function matchingFeilds(feild1, feild2) {
  return (form) => {
    if (form.controls[feild1].value !== form.controls[feild2].value) {
      return { mismatchedFeilds: true };
    }
  };
}
