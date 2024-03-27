import { ResponseError } from '../../util/types/response_error.js'
import { Result } from '../../util/types/result.js'

export namespace UserRepositoryError {

  export class UnableToCreate extends Result<ResponseError> {
    constructor(name: string) {
      super(false, { message: `Unable to create user ${name}`})
    }

    static create(name: string): UnableToCreate {
      return new UnableToCreate(name)
    }
  }

  export class UnableToReadByEmail extends Result<ResponseError> {
    constructor(email: string) {
      super(false, { message: `Unable to read by email ${email}`})
    }

    static create(email: string): UnableToReadByEmail {
      return new UnableToReadByEmail(email)
    }
  }

  export class UserNotFound extends Result<ResponseError> {
    constructor(email: string) {
      super(false, { message: `User with email ${email} not found`})
    }

    static create(email: string): UserNotFound {
      return new UserNotFound(email)
    }
  }
}
