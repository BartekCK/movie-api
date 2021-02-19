export enum UserRole {
    Basic = 'basic',
    Premium = 'premium',
}

export enum SystemError {
    NotFound = 'NotFound',
    EnvError = 'EnvError',
    Forbidden = 'Forbidden',
    Unauthorized = 'Unauthorized',
    BadRequest = 'BadRequest',
    Conflict = 'Conflict',
}

export enum HttpStatus {
    OK = 200,
    Created = 201,

    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,

    InternalServerError = 500,
}
