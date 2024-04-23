export interface academic {
    course: string;
    starDate: Date;
    endDate: Date;
    mark: number;
    institute: string;
  }
  
  export interface jobHistory {
    jobId: string;
    organaisation: string;
    startYear: Date;
    endYear: Date;
    role: string;
  }
  export interface address {
    houseName: string;
    houseNUmber: string;
    streetName: string;
    city: string;
    pincode: string;
  }
  
  export interface userEntity {
    humanid: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    houseName: string;
    houseNumber: string;
    streetName: string;
    city: string;
    pincode: string;
    fatherName: string;
    motherName: string;
    isAdmin:boolean;
    active:boolean;
    mob: string;  
    email: string;
    web: string;
    role?: "user" | "Trainer" | "admin";
    status?: "active" | "dead";
    deleted: boolean;
    verified: boolean;
    profileImage: string;
    approvedBy: string;
    approvedDate: Date;
    lastRevokeDate: Date;
    password:string,
    otp:string,
    otpVerified:boolean;
    address?: address[];
    academics?: academic[];
    jobHistory?: jobHistory[];
    
  }
  
  