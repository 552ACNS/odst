import { Component } from '@angular/core';
import { removeTokens } from '@odst/helpers';

@Component({
  selector: 'odst-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  removeTokens() {
    removeTokens();
  }
}
