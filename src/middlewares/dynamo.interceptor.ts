import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { UserService } from '../modules/user/user.service';
import { MovieService } from '../modules/movie/movie.service';

@Injectable()
export class DynamoInterceptor implements NestInterceptor {
  constructor(
    private readonly userService: UserService,
    private readonly movieService: MovieService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { userId, movieId } = request.body;

    return from(this.validateDocuments(userId, movieId)).pipe(
      mergeMap((result) => {
        if (!result.userExists || !result.movieExists) {
          throw new BadGatewayException('The specified IDs do not exist');
        }
        return next.handle();
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private async validateDocuments(userId: string, movieId: number): Promise<{ userExists: boolean; movieExists: boolean }> {
    const userExists = await this.userService.userExists(userId);
    const movieExists = await this.movieService.movieExists(movieId);
    return { userExists, movieExists };
  }
}
