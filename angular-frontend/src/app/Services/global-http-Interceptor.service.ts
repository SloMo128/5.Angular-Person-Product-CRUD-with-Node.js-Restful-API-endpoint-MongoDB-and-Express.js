import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FeedBack } from "../Models/feedback";

@Injectable()
export class GlobalHttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router) {
  }

  //1.  No Errors
  /*intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept')
        console.error(error);
        return throwError(error.message);
      })
    )
  }*/

  //2. Sending an Invalid Token will generate error
  /*intercept2(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    const token: string = 'invald token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
 
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept')
        console.error(error);
        return throwError(error.message);
      })
    )
  }*/


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HTTP request intercepted');  // Log all requests

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error caught in interceptor', error);  // Log all errors caught

        let feedback: FeedBack = {
          feedbackType: 'error',
          feedbackmsg: '' // Default message
        };

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          feedback.feedbackmsg = 'An error occurred: ' + error.error.message;
          console.error('Client-side error:', error.error.message);
        } else {
          // Server-side error
          console.log(`Server-side error: status ${error.status} ${error.statusText}`);
          switch (error.status) {
            case 0:
              feedback.feedbackmsg = 'Impossibile connetersi al server.';
              break;
            case 401:
              feedback.feedbackmsg = 'Non autorizzato. La richiesta non contiene credenziali di autenticazione valide.';
              break;
            case 402:
                feedback.feedbackmsg = "La risorsa è accessibile solo attraverso pagamento mediante digital cash e micropagamento";
                break;
            case 403:
              feedback.feedbackmsg = "L' accesso alla risorsa definita è negato: le credenziali di autenticazione utilizzate per stabilire la connessione non consentono l'accesso alle risorse specificate nella richiesta.";
              break;
            case 404:
              feedback.feedbackmsg = 'La risorsa richiesta non è stata trovata. La richiesta potrebbe essere stata eliminata.';
              break;
            case 500:
              feedback.feedbackmsg = 'Errore server interno.';
              break;
            default:
              feedback.feedbackmsg = `HTTP Error ${error.status}: ${error.statusText}`;
              break;
          }
        }
        console.error('Error message to be thrown:', feedback.feedbackmsg);  // Ensure error message is logged

        // Optionally, you can return the feedback as part of the error response
        return throwError(feedback);
      })
    );
  }
}