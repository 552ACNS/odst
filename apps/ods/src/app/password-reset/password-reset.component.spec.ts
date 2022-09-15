import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PasswordResetModule } from './password-reset.module';
import { PasswordResetComponent } from './password-reset.component';
import { PasswordResetService } from './password-reset.service';
import { of } from 'rxjs';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  const mockPasswordResetService = {
    passwordReset: jest.fn(),
  };

  const response = {
    data: {
      password: 'P@ssw0rd',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordResetComponent],
      providers: [
        { provide: PasswordResetService, useValue: mockPasswordResetService },
      ],
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        PasswordResetModule,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should submit a changed password and receive confirmation it was changed because the input boxes were filled with the same password', async () => {
    mockPasswordResetService.passwordReset = jest
      .fn()
      .mockReturnValue(of(response));
    component.passwordResetForm.setValue({
      newPassword: 'p@ssw0rd',
      confirmPassword: 'p@ssw0rd',
    });
    component.resetPassword();
    expect(component.changeSuccess).toBeTruthy();
  });
});
