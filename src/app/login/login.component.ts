import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  isLogging = true;
  isLoading = false;
  error: string = "";

  submit() {
    if (this.form.invalid) return;
    this.isLoading = true;
    let userData = {
      username: this.form.value['username'],
      password: this.form.value['password'],
    }
    console.log(userData);
  }

  // onSubmit(authForm: NgForm) {
  //   if (!authForm.valid)
  //     return;
  //   this.isLoading = true;
  //   let userData = {
  //     username: authForm.value['username'],
  //     password: authForm.value['password'],
  //   }
  //   console.log(userData);
  // }
}
