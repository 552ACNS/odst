import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsesModule } from '../responses.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectTagsComponent } from './select-tags.component';
import { MatChipsModule } from '@angular/material/chips';
import { By } from '@angular/platform-browser';

describe('SelectTagsComponent', () => {
  let component: SelectTagsComponent;
  let fixture: ComponentFixture<SelectTagsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ResponsesModule, BrowserAnimationsModule, MatChipsModule],
      declarations: [SelectTagsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SelectTagsComponent);
    component = fixture.componentInstance;
    component.selectedTags = ['Tag 1', 'Tag 2', 'Tag 3'];
    component.tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate with selected tags', () => {
    const displayedTags = fixture.debugElement
      .queryAll(By.css('.mat-chip'))
      .map((Tag) =>
        Tag.nativeElement.textContent.replace(' cancel', '').trim()
      );
    expect(displayedTags).toEqual(component.selectedTags);
  });

  it('Should generate a list of options based on user input', () => {
    component.generateFilteredTags();
    //"[Cater,] you're better at writing tests" - McGrew, 2022
    expect(component.filteredTags).toEqual(
      component.tags.filter((tag) => !component.selectedTags?.includes(tag))
    );
  });
});
