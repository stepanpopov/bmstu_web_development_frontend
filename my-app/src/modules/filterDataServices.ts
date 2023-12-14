import {DOMAIN, requestTime, dataServicesMock} from "../Consts"
import { DataService } from "../models/models"

interface RawDataService {
	data_id: number,
    data_name: string,
    encode: boolean,
    blob: string,
    active: boolean,
    image_url: string,
}

interface RawFilteringResponse {
    data_service: RawDataService[],
    draft_id: number,
}

const filterDataList = async (search: string): Promise<DataService[]> => {
    return fetch(`${DOMAIN}/dataService?dataname=${search}`, {
        method: "GET",
        signal: AbortSignal.timeout(requestTime)
    })
    .then((res) => res.json())
    .then((resp: RawFilteringResponse) => (
        resp.data_service.map((ds: RawDataService) => ({
            id: ds.data_id, 
            name: ds.data_name, 
            blob: ds.blob, 
            image: ds.image_url,
            encode: ds.encode,
            active: ds.active,
        }) )
    ))
    .catch(() => dataServicesMock)
}

export default filterDataList
