
export interface ScheduledTask_Model{
    ScheduledTaskID:string,
    eventName?:string;
    scheduledDate:Date;
    staffInCharge?:string;
    staffDesignation?:string;
    location?:string;
    timeFixed?:boolean;
    startDateTime?:Date;
    endDateTime?:Date;
    taskID?:string;
    eventId?:string;
    cancelled?:boolean;
    active?:boolean;
    deleted?:boolean;
    audience?:{};
    startDate?:Date  ;
    description?:string;
    dayName?:string;
    monthDay?:string;
    yearDay?:string;
    Title?:string;
    details?:string;
    link?:string;
    audienceType?:string;
    prority?:string;
    repeat?:string;
    dayTitle?:string;
    dayDiscription?:string;
    matchedTasks?:object;
    createdDate?:Date;
    submissionDate?:Date;
    participants:[];
}
    
  
  
  
  
  
  
  
  
  

