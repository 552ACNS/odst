import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { GQLModule } from '@odst/gql';
import { Apollo } from 'apollo-angular';
import { environment } from '../environments/environment';
import { AuthGuard, LoggedInGuard } from '@odst/shared/angular';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    GQLModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HeaderModule,
  ],
  providers: [
    Apollo,
    { provide: 'environment', useValue: environment },
    AuthGuard,
    LoggedInGuard,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
