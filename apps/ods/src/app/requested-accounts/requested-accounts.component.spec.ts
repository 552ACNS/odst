import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedAccountsComponent } from './requested-accounts.component';

describe('RequestedAccountsComponent', () => {
  let component: RequestedAccountsComponent;
  let fixture: ComponentFixture<RequestedAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestedAccountsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
