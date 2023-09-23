import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ui-add-user',
  templateUrl: './add-user.component.html',
  styles: [
    `
      .add-user-form {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AddUserComponent {
  form: FormGroup;
  constructor(private addUserUser: UserService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.addUserUser.addNewUser(this.form.controls['name'].value);
    }
  }
}
