import { Component } from '@angular/core';
import { isLoggedIn } from '@odst/helpers';

@Component({
  selector: 'odst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ods';

  isLoggedIn() {
    return isLoggedIn();
  }
}
