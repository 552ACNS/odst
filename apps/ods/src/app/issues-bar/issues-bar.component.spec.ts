import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesBarComponent } from './issues-bar.component';

describe('IssuesBarComponent', () => {
  let component: IssuesBarComponent;
  let fixture: ComponentFixture<IssuesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuesBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
