import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() {}

  handleError(error: Error | HttpErrorResponse): void {
    console.log('GlobalErrorHandlerService: An error occurred');

    if (error instanceof HttpErrorResponse) {
      // Server-side error
      console.error('Server error status:', error.status);
      console.error('Server error message:', error.message);
    } else {
      // Client-side or network error
      console.error('Client-side error:', error.message);
    }
  }
}
