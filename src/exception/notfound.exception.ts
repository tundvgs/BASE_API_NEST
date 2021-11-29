import { HttpException, HttpStatus } from '@nestjs/common';

export class NotfoundException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'DATA NOT FOUND',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
