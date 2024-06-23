enum ActivityType {
    Reading = "Reading",
    Listening = "Listening",
    Speaking = "Speaking",
    Writing = "Writing",
    oneToOne= "OneToOne"
  }


export interface Activity_Types{
    activityName:string;
    activityId:string;
    deleted:boolean;
    active:boolean,
    discription:string,
    type: ActivityType;
}
