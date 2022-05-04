import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { removeTokens } from '@odst/helpers';

@Component({
  selector: 'odst-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  logout() {
    removeTokens();
    this.router.navigate(['login']);
  }

  gotToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
