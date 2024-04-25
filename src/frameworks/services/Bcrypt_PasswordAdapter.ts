import bcrypt from 'bcryptjs'
import { EncryptPasswordServices } from '../../entity/Services/EncryptPasswordServices'  

export class Bcrypt_PasswordAdapter implements EncryptPasswordServices {

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
