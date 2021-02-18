// types
import { SystemError } from '../types/enums';

export class CustomError extends Error {
    private readonly type: SystemError;

    constructor(type: SystemError, message: string) {
        super(message);
        this.type = type;
    }
}
