import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'select-tags',
  imports: [
    MatChipsModule,
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select-tags.component.html',
  styleUrls: ['./select-tags.component.scss'],
})
export class SelectTagsComponent {
  //#region Variables
  @Input() tags: string[] = [];

  @Input() selectedTags: string[] | undefined;

  @Input() tagType: string | undefined = '';

  //TODO: add error handling for the event that the emitted functions fail.
  @Output() add = new EventEmitter<
    MatChipInputEvent | MatAutocompleteSelectedEvent
  >();

  @Output() remove = new EventEmitter<string>();

  tagCtrl = new FormControl();

  filteredTags: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  //#endregion

  /**
   * User selects a tag to be added, which must be a part of the possible tags and not the selected tags
   * The input box will be cleared after the event has been passed back to the parent component
   * @param event Emmitted from an input box for material chips on input
   */
  addTag(event: MatChipInputEvent) {
    if (
      this.tags.includes(event.value) &&
      !this.selectedTags?.includes(event.value)
    ) {
      this.add.emit(event);
      this.selectedTags?.push(event.value);
      // Clear the input values
      if (event.chipInput) {
        event.chipInput.clear();
      }
    }
  }

  /**
   * removes a chosen tag from the selectedTags array and passes that tag to the parent component
   * @param tagToRemove
   */
  removeTag(tagToRemove: string) {
    this.remove.emit(tagToRemove);
    this.selectedTags = this.selectedTags?.filter((tag) => tag !== tagToRemove);
    this.generateFilteredTags();
  }

  /**
   * Adds a tag from a populated list of tags to the selected tags
   * Passes the event to the parent component
   * @param event Emmited from a material option dropdown to select a specific string
   */
  selectTag(event: MatAutocompleteSelectedEvent) {
    if (this.selectedTags?.includes(event.option.value)) return;
    this.add.emit(event);
    this.selectedTags?.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.generateFilteredTags();
  }

  /**
   * Creates a list of tags that can be added by filtering out those already in use
   */
  generateFilteredTags() {
    this.filteredTags = this.tags.filter(
      (tag) => !this.selectedTags?.includes(tag)
    );

    const input = this.tagInput?.nativeElement.value.trim().toLowerCase();

    if (input) {
      this.filteredTags = this.filteredTags.filter((tag) =>
        tag.toLowerCase().includes(input)
      );
    }
  }
}
