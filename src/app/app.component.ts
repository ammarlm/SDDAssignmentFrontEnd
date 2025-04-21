import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'SDDAssignmentFrontEnd';
  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
