export default interface DataService {
    name: string,
    id: number,
    blob: string,
    image?: string,
    encode: boolean,
    active: boolean,
    result?: string,
    success?: boolean,
}
