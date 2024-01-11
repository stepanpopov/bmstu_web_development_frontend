export interface RawDataService {
	data_id: number,
    data_name: string,
    encode: boolean,
    blob: string,
    active: boolean,
    image_url: string,
}

export interface RawEncryptDecryptRequst {
    requestID:      number
    status:         number // "draft" | "deleted" | "formed" | "finished" | "reqjected"
    creationDate:   Date
    finishDate:     Date | null
    formDate:       Date | null
    moderator:      string | null
    creator:        string | null
}
