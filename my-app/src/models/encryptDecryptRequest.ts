export type Status = "draft" | "formed" | "finished" | "rejected" | "deleted"

export const getStatusFromNumber = (num: number): Status => {
    switch (num) {
    case 1:
     return "draft";
    case 2:
     return "formed";
    case 3:
     return "finished";
    case 4:
     return "rejected";
    case 5:
     return "deleted";
    default:
     throw new Error(`Invalid number: ${num}`);
    }
   }

export default interface EncryptDecryptRequest {
    id:             number
    status:         Status
    creationDate:   Date
    finishDate?:    Date
    formDate?:      Date
    moderator?:     string
    creator?:       string
}
