export interface validatedUser{
    name:string;
    email:string;
    active:boolean;
    isAdmin:boolean;
    password?:string;
    status?:boolean;
    otp?:string;
    role?:"user"|"instructor"|"admin"|"dead";
    
}