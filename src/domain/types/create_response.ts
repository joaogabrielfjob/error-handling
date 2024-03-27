import { Either } from '../../util/types/either.js'
import { Result } from '../../util/types/result.js'
import { UserRepositoryError } from '../error/user_repository_error.js'

export type CreateResponse = Either<
  UserRepositoryError.UnableToCreate,

  Result<void>
>
