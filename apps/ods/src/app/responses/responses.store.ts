import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface ResponsesState {
  tagSuccess: boolean | null;
}

@Injectable()
export class ResponsesStore extends ComponentStore<ResponsesState> {
  constructor() {
    super({ tagSuccess: null });
  }

  readonly tagSuccess$ = this.select((state) => state.tagSuccess);

  readonly updateTagStatus = this.updater((state, value: boolean) => ({
    tagSuccess: value,
  }));

  readonly resetTagStatus = this.updater(() => ({
    tagSuccess: null,
  }));
}
