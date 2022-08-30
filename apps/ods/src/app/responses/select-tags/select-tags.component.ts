import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { first, skip } from 'rxjs';
import { capitalize } from 'lodash';
import { ResponsesStore } from '../responses.store';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'select-tags',
  templateUrl: './select-tags.component.html',
  styleUrls: ['./select-tags.component.scss'],
})
export class SelectTagsComponent {
  //#region Variables
  @Input() tags: string[];

  @Input() selectedTags: string[] | undefined;

  @Input() tagType: string;

  //TODO: add error handling for the event that the emitted functions fail.
  @Output() add = new EventEmitter<string>();

  @Output() remove = new EventEmitter<string>();

  tagCtrl = new FormControl();

  filteredTags: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  //#endregion

  constructor(private readonly responsesStore: ResponsesStore) {}

  /**
   * User selects a tag to be added, which must be a part of the possible tags and not the selected tags
   * The input box will be cleared after the event has been passed back to the parent component
   * @param event Emitted from an input box for material chips on input
   */
  async addTag(event: MatChipInputEvent) {
    let input = event.value;
    //Capitalizes the first letter in each word
    input = input.split(' ').map(capitalize).join(' ');

    //Checks if the value is in the list of usable tags and whether it is already in use
    const isPossibleValue = this.tags.includes(input);
    const isNotSelected = !this.selectedTags?.includes(input);

    if (isPossibleValue && isNotSelected) {
      //emits the tag string to the parent component for use
      this.add.emit(input);
      this.selectedTags?.push(input);

      //Takes the first 2 emitted values from the state variable 'tagSuccess$', the first being null by default
      //The second value will be whether the tag was successfully added to the database
      this.responsesStore.tagSuccess$
        .pipe(skip(1), first())
        .subscribe((data) => {
          //Adds the tag to the chip display if it was successfully added to the database
          if (data) {
            // Clear the input values
            if (event.chipInput) {
              event.chipInput.clear();
            }
          } else {
            //Removes the tag if tag success returns false
            this.selectedTags = this.selectedTags?.filter(
              (item) => item != input
            );
          }
          //Resets the tag success boolean to null
          this.responsesStore.resetTagStatus();
        });
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
   * @param event Emitted from a material option dropdown to select a specific string
   */
  selectTag(event: MatAutocompleteSelectedEvent) {
    if (this.selectedTags?.includes(event.option.value)) return;
    this.add.emit(event.option.value);
    this.responsesStore.tagSuccess$.pipe(skip(1), first()).subscribe((data) => {
      if (data) {
        this.selectedTags?.push(event.option.value);
      }
      this.responsesStore.resetTagStatus();
    });
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
