export interface EventTypes{
    eventName:string;
    eventId:string;
    active:boolean;
    deleted:boolean;
    eventType:"public"|"inhouse"|"staff"|"student"
}