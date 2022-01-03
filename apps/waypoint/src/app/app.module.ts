import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { GQLModule } from '@odst/gql';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, GQLModule],
  providers: [Apollo],
  bootstrap: [AppComponent],
})
export class AppModule {}
