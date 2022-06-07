import { Component } from '@angular/core';
import { isLoggedIn } from '@odst/helpers';
import { environment } from '../environments/environment';

@Component({
  selector: 'odst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ods';
  environment = environment;

  isLoggedIn(): boolean {
    return isLoggedIn();
  }
}
