import { DOMAIN, dataServicesMock, requestTime } from "../../consts.tsx";
import DataService from "../../models/dataService"

interface RawDataService {
	data_id: number,
    data_name: string,
    encode: boolean,
    blob: string,
    active: boolean,
    image_url: string,
}

export const fetchDsByID = async (id: number): Promise<DataService> => {
    return fetch(`${DOMAIN}/dataService/${id}`, {
        method: "GET",
        signal: AbortSignal.timeout(requestTime)
    }).then((resp) => resp.json())
    .then((resp: RawDataService) => ({
        id: resp.data_id, 
        name: resp.data_name, 
        blob: resp.blob, 
        image: resp.image_url,
        encode: resp.encode,
        active: resp.active,
    }))
    .catch(() => (dataServicesMock.length - 1 > id ? dataServicesMock[id] : dataServicesMock[0]))
};
