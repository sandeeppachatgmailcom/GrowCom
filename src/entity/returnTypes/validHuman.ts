export interface ValidHumanReturnTypes {
humanid: string;
firstName: string;
lastName: string;
isAdmin:boolean;
active:boolean;
mob: string;  
email: string;
web: string;
role?:"user"|"trainer"|"admin"|"student";
deleted: boolean;
verified: boolean;
profileImage: string;
admin:boolean;
user:boolean;
student:boolean;
trainer:boolean;
otpVerified:boolean;
}