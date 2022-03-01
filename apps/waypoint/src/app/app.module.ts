import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { GQLModule } from '@odst/gql';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePersonComponent } from './create-person/create-person.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateOrgComponent } from './create-org/create-org.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationBarLinksComponent } from './navigation-bar-links/navigation-bar-links.component';
import { environment } from '../environments/environment';
import { NavigationBarRoutingModule } from './navigation-bar/navigation-bar-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CreatePersonComponent,
    CreateOrgComponent,
    LoginComponent,
    TableComponent,
    NavigationBarComponent,
    NavigationBarLinksComponent,
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    HttpClientModule,
    GQLModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    NavigationBarRoutingModule,
  ],
  providers: [Apollo, { provide: 'environment', useValue: environment }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
