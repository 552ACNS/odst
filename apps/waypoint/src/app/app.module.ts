import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql/graphql.module';
import { Apollo } from 'apollo-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, GraphQLModule],
  providers: [Apollo],
  bootstrap: [AppComponent],
})
export class AppModule {}
