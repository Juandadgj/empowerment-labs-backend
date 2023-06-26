import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';
import type { CustomError } from '../shared/interfaces/cumtom-erros.interface'

@Injectable()
export class AxiosInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: AxiosError) => {
        const customError: CustomError = error.response.data;
        if (error.response) {
          console.log(error.response);
          const statusCode = error.response.status;
          const message = customError?.message || 'An error occurred in the response';
          throw new BadGatewayException(`Error ${statusCode}: ${message}`);
        } else if (error.request) {
          throw new BadGatewayException('No response has been received from the server');
        } else {
          throw new BadGatewayException('The request could not be made');
        }
      }),
    );
  }
}
