import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo, private router: Router) {}
  //submitLogin(username: string, password: string): void {}

  goBack(): void {
    this.router.navigate(['disclaimer']);
  }
}
