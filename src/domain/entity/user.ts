type UserProps = { name: string, email: string, password: string }

export interface User extends UserProps { }

export class User {

  constructor({ name, email, password }: UserProps) {
    this.hasValidName(name)
    this.hasValidEmail(email)
    this.hasValidPassword(password)

    this.name = name
    this.email = email
    this.password = password
  }

  hasValidName(name: string) {
    if (!name || !name.trim().length) throw new Error('Invalid name!')
  }

  hasValidEmail(email: string) {
    if (!email || !email.trim().length || !email.includes('@')) throw new Error('Invalid email!')
  }

  hasValidPassword(password: string) {
    if (!password || !password.trim().length || password.length < 4) throw new Error('Invalid password')
  }
}
