import { emitWarning } from "process";
import { userInput } from "../../entity/returnTypes/validUser";
import { validatedUser } from "../../entity/returnTypes/validatedUsed";
import { authusecases } from "../../usecases/interface/authUsecases";
import userModel from "../models/userModel";
import { userEntity } from "../../entity/models/userEntity";

export class AuthUser implements authusecases {
    async  verifyUser(data: userInput): Promise< validatedUser | void> {
        try {
          const { name, email, password } = data;
          const result:any = await userModel.findOne({ email: email, password: password });
          console.log(result)
          if (result) {
            const { isAdmin, active, role } = result;
            const success = 'true';
            return { email, isAdmin, active, name,role };
          } else {
            // Handle case when no user is found
            // For example, you could throw an error or return a custom response
            throw new Error('User not found');
          }
        } catch (error) {
          // Handle any errors that occur during the database operation
          console.error('Error verifying user:', error);
          throw error;
        }
      }
}