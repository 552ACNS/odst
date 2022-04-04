import { Component } from '@angular/core';

@Component({
  selector: 'odst-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
})
export class DisclaimerComponent {

  navigateToLogin() {
    window.location.href = '/login';
  }
}

