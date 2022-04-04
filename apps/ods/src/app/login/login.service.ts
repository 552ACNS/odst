import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo, private router: Router) {}
  //submitLogin(username: string, password: string): void {}
  //TODO: route to the dashboard
  submitLogin(): void {
    this.router.navigate(['responses']);
  }

  goBack(): void {
    this.router.navigate(['disclaimer']);
  }

  
}
