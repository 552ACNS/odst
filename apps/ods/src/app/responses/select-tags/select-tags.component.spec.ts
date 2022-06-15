import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTagsComponent } from './select-tags.component';

describe('SelectTagsComponent', () => {
  let component: SelectTagsComponent;
  let fixture: ComponentFixture<SelectTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectTagsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
