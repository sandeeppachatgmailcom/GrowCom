import userModel from "./src/frameworks/models/userModel"

async function getBatchWiseStudentsList():Promise<void> { 
  
    try {
      const res = userModel.aggregate([
        {
          $match:{
             role:'student' 
          }
        },
        {
          $lookup:{
            from:'studentbatches',
            localField:'batchId',
            foreignField:'batchId',
            as :'batchName'
          }
        },
        {
          $project:{
            firstName:1,
            email:1,
            academics:1,
            active:1,
            address:1,
            admin:1,
            deleted:1,
            isAdmin:1,
            jobHistory:1,
            otp:1,
            otpVerified:1,
            role:1,
            student:1,
            trainer:1,
            user:1,
            batchId:1,
            week:1 ,
            'batchName.batchName':1
          }
        }
      ])
      console.log(res,'----------***********************---------------')
    } catch (error) {
      
    } } 

getBatchWiseStudentsList();
 