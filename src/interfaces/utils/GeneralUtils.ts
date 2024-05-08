import { UtilityServices } from "../../entity/utils/utilityServices";

export class GeneralUtils implements UtilityServices{
    daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    month:{ [key: string]: string }= {Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12'}

    getDayName(date:Date ){
        
        const dateObj :Date = new Date(date);
        const day = dateObj.getDay();
        const monthofDay:string = this.month[dateObj.toString().split(' ').slice(0,3)[1]] as string
        const dayofMonth  = dateObj.toString().split(' ').slice(0,3)[2]
        const dayName = this.daysOfWeek[day]
        return {dayName:dayName,monthDay:monthofDay,day:dayofMonth};  
    }
}