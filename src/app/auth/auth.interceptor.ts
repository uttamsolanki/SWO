import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { UserService } from '../user.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: UserService, private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('No-Auth') == "True")
      return next.handle(req.clone());

    if (this.auth.isLoggednIn() != null) {
      const clonedreq =    req.clone({
        headers: req.headers.set('Authorization',  localStorage.getItem('token'))
      });

      return next.handle(clonedreq).pipe(
        tap(
          event => {
           // if(event instanceof HttpResponse)
              return event;
          },
          error => {
            //logging the http response to browser's console in case of a failuer
            if (event instanceof HttpResponse) {

            }
          }
        )
      );

    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
}
