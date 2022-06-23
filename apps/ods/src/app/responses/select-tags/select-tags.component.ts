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
import { UntypedFormControl } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'select-tags',
  templateUrl: './select-tags.component.html',
  styleUrls: ['./select-tags.component.scss'],
})
export class SelectTagsComponent {
  @Input() tags: string[];

  @Input() selectedTags: string[] | undefined;

  @Input() tagCtrl: UntypedFormControl;

  @Input() tagType: string;

  @Output() add = new EventEmitter<MatChipInputEvent>();

  @Output() remove = new EventEmitter<string>();

  @Output() selected = new EventEmitter<MatAutocompleteSelectedEvent>();

  filteredTags;

  @ViewChild('tagInput', { static: true })
  tagInput: ElementRef<HTMLInputElement>;

  //TODO Clear search text after tag added (mainly is problem when you click on result)
  //TODO Make it so pressing enter selects the first option available if there are any
  addTag(event: MatChipInputEvent) {
    if (
      this.tags.includes(event.value) &&
      !this.selectedTags?.includes(event.value)
    ) {
      this.add.emit(event);
      this.selectedTags?.push(event.value);
    }
  }

  removeTag(tagToRemove: string) {
    this.remove.emit(tagToRemove);
    this.selectedTags = this.selectedTags?.filter((tag) => tag !== tagToRemove);
    this.filteredTags = this.tags.filter(
      (tag) => !this.selectedTags?.includes(tag)
    );
  }

  selectTag(event: MatAutocompleteSelectedEvent) {
    this.selected.emit(event);
    this.selectedTags?.push(event.option.value);
    this.filteredTags = this.tags.filter(
      (tag) => !this.selectedTags?.includes(tag)
    );
  }

  autoComplete(input: string) {
    input = input?.trim().toLowerCase();

    if (input) {
      this.filteredTags = this.tags.filter(
        (tag) => !this.selectedTags?.includes(tag) && tag.includes(input)
      );
    } else {
      this.filteredTags = this.tags.filter(
        (tag) => !this.selectedTags?.includes(tag)
      );
    }
  }
}
