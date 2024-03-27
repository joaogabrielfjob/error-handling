import { ResponseError } from '../../util/types/response_error.js'
import { Result } from '../../util/types/result.js'

export namespace UserError {

  export class NameInvalidError extends Result<ResponseError> {
    constructor(name: string) {
      super(false, { message: `The name "${name}" is invalid`})
    }

    static create(name: string): NameInvalidError {
      return new NameInvalidError(name)
    }
  }

  export class EmailInvalidError extends Result<ResponseError> {
    constructor(email: string) {
      super(false, { message: `The email "${email}" is invalid`})
    }

    static create(email: string): EmailInvalidError {
      return new EmailInvalidError(email)
    }
  }

  export class PasswordInvalidError extends Result<ResponseError> {
    constructor(password: string) {
      super(false, { message: `The password "${password}" is invalid`})
    }

    static create(password: string): PasswordInvalidError {
      return new PasswordInvalidError(password)
    }
  }
}
