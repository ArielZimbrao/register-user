import { HttpStatus, HttpException } from '@nestjs/common';

export class Unauthorized extends HttpException {
    constructor() {
        super('Acesso não autorizado!', HttpStatus.UNAUTHORIZED);
    }
}

export class InvalidToken extends HttpException {
    constructor() {
        super('O Tokén enviado está nulo ou indefinido', HttpStatus.BAD_REQUEST);
    }
}

export class InvalidID extends HttpException {
    constructor() {
        super('O ID enviado é invalido', HttpStatus.BAD_REQUEST);
    }
}

export class UserNonexistent extends HttpException {
    constructor() {
        super('Usuario Inexistente', HttpStatus.BAD_REQUEST);
    }
}