import { DOMAIN, dataServicesMock, requestTime } from "../Consts";
import {DataService} from "../models/models.ts"

interface RawDataService {
	data_id: number,
    data_name: string,
    endcode: boolean,
    blob: string,
    active: boolean,
    image_url: string,
}

const getDsByID = async (id: number): Promise<DataService> => {
    return fetch(`${DOMAIN}/dataService/${id}`, {
        method: "GET",
        signal: AbortSignal.timeout(requestTime)
    }).then((resp) => resp.json())
    .then((resp: RawDataService) => ({id: resp.data_id, name: resp.data_name, blob: resp.blob, image: resp.image_url}))
    .catch(() => (dataServicesMock.length - 1 > id ? dataServicesMock[id] : dataServicesMock[0]))
};

export default getDsByID;
