import { Component, Input } from '@angular/core';

@Component({
  selector: 'odst-navigation-bar-links',
  templateUrl: './navigation-bar-links.component.html',
  styleUrls: ['./navigation-bar-links.component.scss']
})
export class NavigationBarLinksComponent {

  @Input() navLinks = "";

}
