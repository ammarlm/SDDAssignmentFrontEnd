import { Component, Inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user.moldel';
import { NgFor, NgIf } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-from',
  imports: [ReactiveFormsModule, MaterialModule, FormsModule, TranslateModule, NgIf, NgFor],
  templateUrl: './user-from.component.html',
  styleUrl: './user-from.component.scss'
})
export class UserFromComponent {
  form: FormGroup;
  roles = ['Administrator', 'User'];
  msg: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User | null },
    private translate: TranslateService,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      username: [data.user?.username ?? '', Validators.required],
      password: ['', data.user ? [] : [Validators.required]],
      role: [data.user?.role ?? 'User', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const user: User = {
        id: this.data.user?.id ?? '',
        username: this.form.value.username,
        role: this.form.value.role,
        password: this.form.value.password,
      };
      if (this.data.user) {
        this.userService.updateUser(user.id!, user).subscribe({
          next: (response) => {
            console.log(response);
            this.dialogRef.close(user);
          },
          error: (error) => {
            console.error(error);
            this.msg = error.error?.message;
          },
        });
      } else {
        this.userService.addUser(user).subscribe({
          next: (response) => {
            console.log(response);
            this.dialogRef.close(user);
          },
          error: (error) => {
            console.error(error);
            this.msg = error.error?.message;
          },
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
