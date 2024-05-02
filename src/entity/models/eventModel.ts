export interface Event_Model{
    eventName:string;
    eventId:string;
    cancelled:boolean;
    active:boolean;
    deleted:boolean;
    eventType:"public"|"inhouse"|"staff"|"student"
}