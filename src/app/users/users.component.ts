import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { TranslateService, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { AuthService } from '../login/auth.service';
import { User } from './user.moldel';
import { UserFromComponent } from './user-from/user-from.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { ConfirmDialogComponent } from '../shared/component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  imports: [MaterialModule, FormsModule, TranslateModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['username', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();
  pageSize = 10;
  totalCount = 0;
  search = '';
  user: User | null = null;

  private defaultWidth = '600px';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.authService.loginUser.subscribe((user) => {
      console.log(user);
      
      if (user == null) return;
      this.user = {
        username: user.username,
        role: user.role
      };
    })
  }

  ngOnInit(): void {
    this.loadUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  get isAdmin(): boolean {
    return this.authService.getUserRole() === 'Administrator';
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe((sort) => {
      this.loadUsers();
    });
  }

  loadUsers(): void {
    const pageIndex = this.paginator?.pageIndex ?? 0;
    this.userService.getUsers(pageIndex, this.pageSize, this.sort?.active, this.sort?.direction == '' ? 'asc' : this.sort?.direction, this.search)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.data.items;
          this.totalCount = response.data.totalItems;
        },
        error: () => {
          alert(this.translate.instant('ERRORS.LOAD_USERS'));
        }
      });
  }

  applyFilter(): void {
    this.paginator.pageIndex = 0;
    this.loadUsers();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserFromComponent, {
      width: this.defaultWidth,
      data: { user: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(UserFromComponent, {
      width: this.defaultWidth,
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers()
      }
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: this.translate.instant('USERS.CONFIRM_DELETE') }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(() => this.loadUsers());
      }
    });
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }

  logout(): void {
    this.authService.logout();
  }
}
