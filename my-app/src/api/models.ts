export interface RawDataService {
	data_id: number,
    data_name: string,
    encode: boolean,
    blob: string,
    active: boolean,
    image_url: string,
}

export interface RawEncryptDecryptRequst {
    RequestID:      number
    Status:         number // "draft" | "deleted" | "formed" | "finished" | "reqjected"
    CreationDate:   string
    FinishDate:     string | null
    FormDate:       string | null
    Moderator:      string | null
    Creator:        string | null
}
