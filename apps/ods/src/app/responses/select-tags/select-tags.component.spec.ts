import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsesModule } from '../responses.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectTagsComponent } from './select-tags.component';
import { MatChipsModule } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SelectTagsComponent', () => {
  let component: SelectTagsComponent;
  let fixture: ComponentFixture<SelectTagsComponent>;
  let tagCtrl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsesModule, BrowserAnimationsModule, MatChipsModule],
      declarations: [SelectTagsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    tagCtrl = new FormControl();
    fixture = TestBed.createComponent(SelectTagsComponent);
    component = fixture.componentInstance;
    component.selectedTags = ['Tag 1', 'Tag 2', 'Tag 3'];
    component.tagCtrl = tagCtrl;
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
    expect(displayedTags.length).toEqual(component.selectedTags?.length);
    expect(displayedTags).toEqual(component.selectedTags);
  });

  it('Should generate a list of options based on user input', () => {
    const input = 'R';
    component.autoComplete(input);
    //"[Cater,] you're better at writing tests" - McGrew, 2022
    expect(component.filteredTags).toEqual(
      component.possibleTags.filter((tag) => tag.match(input))
    );
  });
});
