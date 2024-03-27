import { User } from '../entity/user.js'
import { CreateResponse } from '../types/create_response.js'
import { ReadByEmailResponse } from '../types/read_by_email_response.js'

export interface UserRepository {

  create(user: User): Promise<CreateResponse>

  readByEmail(email: string): Promise<ReadByEmailResponse>
}
