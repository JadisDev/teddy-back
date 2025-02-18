// src/logging/logging.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, headers, body } = request;
    const now = Date.now();

    let userName = null;

    if (headers.authorization) {
      const token = headers.authorization.split(' ')[1];
      
      try {
        const decodedToken: any = jwt.decode(token);
        
        if (decodedToken && decodedToken.name) {
          userName = decodedToken.name;
        }
      } catch (error) {
        this.logger.error('Erro ao decodificar o token', error.stack);
      }
    }

    this.logger.log(`Incoming request: ${method} ${url}`);
    if (userName) {
      this.logger.log(`User: ${userName}`);
    }

    if (body && typeof body === 'object' && Object.keys(body).length > 0) {
      this.logger.log(`Body: ${JSON.stringify(body)}`);
    }

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        this.logger.log(`Request ${method} ${url} completed in ${responseTime}ms`);
      }),
    );
  }
}
