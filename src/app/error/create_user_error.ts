import { ResponseError } from '../../util/types/response_error.js'
import { Result } from '../../util/types/result.js'

export namespace CreateUserError {

  export class EmalAlreadyUsed extends Result<ResponseError> {
    constructor(email: string) {
      super(false, { message: `The email "${email}" has already been used`})
    }

    static create(name: string): EmalAlreadyUsed {
      return new EmalAlreadyUsed(name)
    }
  }
}
