import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PasswordRecoveryComponent } from './password-recovery.component';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryModule } from './password-recovery.module';
import { of } from 'rxjs';

describe('PasswordRecoveryComponent', () => {
  let component: PasswordRecoveryComponent;
  let fixture: ComponentFixture<PasswordRecoveryComponent>;

  const mockPasswordRecoveryService = {
    passwordRecovery: jest.fn(),
  };

  const response = {
    data: {
      email: 'email@a.com',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordRecoveryComponent],
      providers: [
        {
          provide: PasswordRecoveryService,
          useValue: mockPasswordRecoveryService,
        },
      ],
      imports: [
        ApolloTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        PasswordRecoveryModule,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(PasswordRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should make changeSuccess true because a password reset request was successful', async () => {
    mockPasswordRecoveryService.passwordRecovery = jest
      .fn()
      .mockReturnValue(of(response));
    component.passwordRecoveryForm.setValue({ email: 'admin@admin.com' });
    component.recoverPassword();

    expect(component.recoveryRequestSubmitted).toBeTruthy();
  });
});
