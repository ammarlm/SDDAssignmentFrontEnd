import { Component, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-users',
  imports: [MaterialModule, FormsModule, TranslateModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['username', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();
  pageSize = 10;
  totalCount = 0;
  search = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    // private userService: UserService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.loadUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get isAdmin(): boolean {
    return this.authService.getUserRole() === 'Administrator';
  }

  loadUsers(): void {
  }

  applyFilter(): void {
    this.paginator.pageIndex = 0;
    this.loadUsers();
  }


  switchLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
