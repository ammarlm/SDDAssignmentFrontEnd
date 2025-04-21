import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });

  isLogging = true;
  isLoading = false;
  error: string = "";


  constructor(private authService: AuthService, private router: Router) {
  }

  submit() {
    console.log(this.form);
    if (this.form.invalid) return;
    this.isLoading = true;
    let userData = {
      username: this.form.value['username'],
      password: this.form.value['password'],
    }
    console.log(userData);
    this.authService.login(userData.username, userData.password).subscribe({
      next: (response) => {
        console.log(response)
        this.router.navigate(['/']);
        this.form.reset();
      },
      error: (error) => {
        console.error(error);
        this.error = error.error?.message;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
