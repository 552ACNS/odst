import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsesModule } from '../responses.module';
import { SelectTagsComponent } from './select-tags.component';

describe('SelectTagsComponent', () => {
  let component: SelectTagsComponent;
  let fixture: ComponentFixture<SelectTagsComponent>;
  let compiled;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsesModule],
      declarations: [SelectTagsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTagsComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate with selected tags', () => {
    component.selectedTags = ['Tag 1', 'Tag 2', 'Tag 3'];
    const displayedTags = compiled.querySelectorAll('mat-chip');
    expect(displayedTags).toEqual(component.selectedTags);
    expect(displayedTags.length()).toEqual(3);
  });
});
