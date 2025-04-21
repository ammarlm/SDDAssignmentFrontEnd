import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './login/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'SDDAssignmentFrontEnd';
  constructor(private readonly authService: AuthService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.authService.autoLogin();
  }
}
