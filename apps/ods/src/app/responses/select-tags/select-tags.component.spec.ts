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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTagsComponent);
    component = fixture.componentInstance;
    component.selectedTags = ['Tag 2', 'Tag 1', 'Tag 3'];
    component.tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the selected tags', () => {
    const displayedTags: string[] = fixture.debugElement
      .queryAll(By.css('.mat-chip'))
      .map((Tag) =>
        //The cancel icon on the remove button returns in the text content as 'cancel'
        //This removes that from the end of the string so only the tag is returned
        Tag.nativeElement.textContent.replace(' cancel', '').trim()
      );

    expect(displayedTags).toHaveLength(3);
    expect(displayedTags).toEqual(component.selectedTags);
  });

  it('Should generate a list of options based on already selected tags', () => {
    //generates the tag based on all tags and the current selected tags
    component.generateFilteredTags();

    const actual: string[] = component.filteredTags;
    const expected: string[] = ['Tag 4', 'Tag 5', 'Tag 6'];

    expect(actual).toEqual(expected);
  });

  it('Should generate a list of options based on user input', () => {
    //Sets the value of the input box
    component.tagInput.nativeElement.value = '5';

    //Triggers the input event so generateFilteredTags is ran and detects the value
    component.tagInput.nativeElement.dispatchEvent(new Event('input'));
    component.generateFilteredTags();

    const actual: string[] = component.filteredTags;
    const expected: string[] = ['Tag 5'];

    expect(actual).toEqual(expected);
  });

  // it('Should generate a list of options based on already selected tags', () => {
  //   //generates the tag based on all tags and the current selected tags
  //   component.generateFilteredTags();
  //   spyOn(component.add, 'emit');
  //
  //   const actual: string[] = component.filteredTags;
  //   const expected: string[] = ['Tag 4', 'Tag 5', 'Tag 6'];
  //
  //   expect(actual).toEqual(expected);
  // });
});
