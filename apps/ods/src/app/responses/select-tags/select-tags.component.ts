import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl, UntypedFormControl } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'select-tags',
  templateUrl: './select-tags.component.html',
  styleUrls: ['./select-tags.component.scss'],
})
export class SelectTagsComponent {
  @Input() tags: string[];

  @Input() selectedTags: string[] | undefined;

  @Input() tagType: string;

  @Output() add = new EventEmitter<
    MatChipInputEvent | MatAutocompleteSelectedEvent
  >();

  @Output() remove = new EventEmitter<string>();

  tagCtrl = new FormControl();

  filteredTags;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  //TODO Clear search text after tag added (mainly is problem when you click on result)
  //TODO Make it so pressing enter selects the first option available if there are any
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

  removeTag(tagToRemove: string) {
    this.remove.emit(tagToRemove);
    this.selectedTags = this.selectedTags?.filter((tag) => tag !== tagToRemove);
    this.generateFilteredTags();
  }

  selectTag(event: MatAutocompleteSelectedEvent) {
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
