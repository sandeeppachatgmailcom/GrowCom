import { UserRepository } from "../../entity/repository/userRepository";
import { UpdatePromoCodeUseCase } from "../../entity/usecases/commonUseCases/updatePromoCode";

  class UpdatePromoCodeSocket implements UpdatePromoCodeUseCase{
    constructor(
        private userRepo : UserRepository,
         

    ){

    } 
    async updatePromoCode(data: { email: string; promoCode: string; }): Promise<{status: boolean; message: string; role: string; }| void > {
      try {
        console.log(data,'reached Socket')
        let role = ''
        if(data.promoCode == 'STD00001'){
              role= 'student'
        }
        else if(data.promoCode == 'TRN00001'){
              role = 'trainer'
        }
        if(role.length){
            const validDate = new Date()
            validDate.setDate(validDate.getDate() +30)
            console.log(validDate,role,data.email,data.promoCode,'validDate,role,data.email,data.promoCode')
            const result = await this.userRepo.applyPromocode( {email:data.email,promoCode:data.promoCode,role:role,validity:validDate})
            return result
        }
        else{
            return {status:false,message:'updateFailed',role:'user'}
        }
    }
    catch (error) {
        
    }
      } 
}

export default UpdatePromoCodeSocket