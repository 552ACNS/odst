import { ErrorHandler, Injectable } from '@angular/core';
import { removeTokens } from '@odst/helpers';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  handleError(error) {
    if (error.message.includes('Token malformed')) {
      removeTokens();
    }
  }
}
