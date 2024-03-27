import { Either } from '../../util/types/either.js'
import { Result } from '../../util/types/result.js'
import { User } from '../entity/user.js'
import { UserRepositoryError } from '../error/user_repository_error.js'

export type ReadByEmailResponse = Either<
  UserRepositoryError.UnableToCreate,

  Result<User>
>
