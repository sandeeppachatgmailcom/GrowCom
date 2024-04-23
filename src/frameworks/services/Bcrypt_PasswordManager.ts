import bcrypt from 'bcryptjs'
import { InterFacehashedPassword } from '../../entity/services/hashedPassword'  

export class Bcrypt_PasswordManager implements InterFacehashedPassword {

  constructor(){}

  async hashPassword(password: string): Promise<string> {
    const hashPassword = await bcrypt.hash(password,10)
     console.log(hashPassword)
    return hashPassword
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
     const passwordMatch=await bcrypt.compare(password,hashPassword)
        return passwordMatch
  }
}
