import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FeedBack } from '../Models/feedback';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }


  handleError(error: Error | HttpErrorResponse): FeedBack {
    console.log('GlobalErrorHandlerService');

    let feedback: FeedBack = {
      feedbackType: 'error',
      feedbackmsg: 'An error occurred.' // Messaggio di default
    };

    if (error instanceof HttpErrorResponse) {
      // Gestione degli errori HTTP
      switch (error.status) {
        case 401:
          feedback.feedbackmsg = 'Unauthorized';
          break;
        case 403:
          feedback.feedbackmsg = 'Forbidden';
          break;
        case 404:
          feedback.feedbackmsg = 'Not found';
          break;
        case 500:
          feedback.feedbackmsg = 'Internal server error.';
          break;
        default:
          feedback.feedbackmsg = `HTTP Error ${error.status}`;
          break;
      }
    } else {
      // Gestione di altri tipi di errori
      feedback.feedbackmsg = error.message || 'An unexpected error occurred.';
    }

    console.error('Errore gestito:', feedback.feedbackmsg);
    return feedback;
  }
}
