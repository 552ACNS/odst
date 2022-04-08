import { Component } from '@angular/core';
import { NavProps } from '@odst/types/waypoint';
import { isLoggedIn } from '@odst/helpers';

@Component({
  selector: 'odst-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  navLinks: NavProps[] = [
    // {path:'/login', icon:'home', name:'Home'},
    { path: '/create-person', icon: 'build', name: 'Create' },
    { path: '/create-org', icon: 'update', name: 'Update' },
    { path: '/table-view', icon: 'visibility', name: 'View' },
  ];
  loggedInCheck() {
    return isLoggedIn();
  }
}
