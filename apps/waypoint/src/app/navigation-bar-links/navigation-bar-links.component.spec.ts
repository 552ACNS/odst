import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBarLinksComponent } from './navigation-bar-links.component';

describe('NavigationBarLinksComponent', () => {
  let component: NavigationBarLinksComponent;
  let fixture: ComponentFixture<NavigationBarLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationBarLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
