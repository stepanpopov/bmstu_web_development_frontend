
export const StatusTypes = ["draft", "formed", "finished", "rejected", "deleted"] as const

export type Status = typeof StatusTypes[number];

export const getStatusFromNumber = (num: number): Status => {

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

export const getStatusFromString = (str: string): Status | undefined => {
    switch (str) {
        case "draft":
            return "draft";
        case "deleted":
            return "deleted";
        case "formed":
            return "formed";
        case "finished":
            return "finished";
        case "rejected":
            return "rejected";
        default:
            return undefined
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
