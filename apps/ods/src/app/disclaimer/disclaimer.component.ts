import { Component } from '@angular/core';

@Component({
  selector: 'odst-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
})
export class DisclaimerComponent {
  goHome() {
    // navigate to www.tinker.af.mil
    window.location.href = 'http://www.tinker.af.mil';
  }
}
