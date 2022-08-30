import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface ResponsesState {
  tagSuccess: boolean | null;
  tagRemoveSuccess: boolean | null;
  fetchSuccess: boolean;
}

@Injectable()
export class ResponsesStore extends ComponentStore<ResponsesState> {
  constructor() {
    super({ tagSuccess: null, tagRemoveSuccess: null, fetchSuccess: true });
  }

  readonly tagSuccess$ = this.select((state) => state.tagSuccess);

  readonly tagRemoveSuccess$ = this.select((state) => state.tagRemoveSuccess);

  readonly fetchSuccess$ = this.select((state) => state.fetchSuccess);

  readonly updateTagStatus = this.updater((state, value: boolean) => ({
    tagSuccess: value,
    tagRemoveSuccess: state.tagRemoveSuccess,
    fetchSuccess: state.fetchSuccess,
  }));

  readonly updateTagRemoveStatus = this.updater((state, value: boolean) => ({
    tagSuccess: state.tagSuccess,
    tagRemoveSuccess: value,
    fetchSuccess: state.fetchSuccess,
  }));

  readonly updateFetchStatus = this.updater((state, value: boolean) => ({
    tagSuccess: state.tagSuccess,
    tagRemoveSuccess: state.tagRemoveSuccess,
    fetchSuccess: value,
  }));

  readonly resetTagStatus = this.updater((state) => ({
    tagSuccess: null,
    tagRemoveSuccess: state.tagRemoveSuccess,
    fetchSuccess: state.fetchSuccess,
  }));

  readonly resetTagRemoveStatus = this.updater((state) => ({
    tagSuccess: state.tagSuccess,
    tagRemoveSuccess: null,
    fetchSuccess: state.fetchSuccess,
  }));
}
