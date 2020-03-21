import { ExceptionFilter, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, response) {
    const status = exception.getStatus();
    const msg = exception.getResponse();

    response.status(status, msg);
    response.send(msg);
  }
}