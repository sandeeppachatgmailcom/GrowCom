import { FailedStatus_reply } from "../Types_1/failedStatus";
import { Submission__Model } from "../models/SubmissionModel";

export interface Submission_Repo {
    createSubmission(data:Submission__Model):Promise<Submission__Model & FailedStatus_reply | void>
}