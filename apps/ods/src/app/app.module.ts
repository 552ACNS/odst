import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GQLModule } from '@odst/gql';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    GQLModule,
  ],
  providers: [Apollo, { provide: 'environment', useValue: environment }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
