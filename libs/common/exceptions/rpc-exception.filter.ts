import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log("🚀 ~ file: rpc-exception.filter.ts:8 ~ ExceptionFilter ~ exception:", exception.getError())
    return throwError(() => exception.getError());
  }
}