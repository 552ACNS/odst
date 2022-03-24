import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { IssuesBarComponent } from './issues-bar/issues-bar.component';

@NgModule({
  declarations: [AppComponent, IssuesBarComponent],
  imports: [
    MatButtonModule,
    BrowserModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
