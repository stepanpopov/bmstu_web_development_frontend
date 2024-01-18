export type Status = "draft" | "formed" | "finished" | "rejected" | "deleted"

export const getStatusFromNumber = (num: number): Status => {
    console.log(num)
    switch (num) {
        case 0:
            return "draft";
        case 1:
            return "deleted";
        case 2:
            return "formed";
        case 3:
            return "finished";
        case 4:
            return "rejected";
        default:
            throw new Error(`Invalid number: ${num}`);
    }
}

export default interface EncryptDecryptRequest {
    id: number
    status: Status
    creationDate: number
    finishDate?: number
    formDate?: number
    moderator?: string
    creator?: string
}
