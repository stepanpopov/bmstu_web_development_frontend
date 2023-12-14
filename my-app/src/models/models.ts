export interface DataService {
    name: string,
    id: number,
    blob: string,
    image?: string,
    encode: boolean,
    active: boolean
}

export interface Page {
    link: string,
    title: string
}
