import { DOMAIN, requestTime } from "../../consts"
import DataService from "../../models/dataService"
import { RawDataService } from "../models";
import axios from "axios";

interface RawFilteringResponse {
    data_service: RawDataService[],
    draft_id: number,
}

const config = (search: string) => ({
    method: "get",
    url: `${DOMAIN}/dataService/?dataname=${search}`,
    timeout: requestTime * 3,  
})

export const fetchDataListByName = async (search: string): Promise<DataService[]> => {
    const resp = await axios<RawFilteringResponse>(config(search))
    return resp.data.data_service.map((ds: RawDataService) => ({
        id: ds.data_id, 
        name: ds.data_name, 
        blob: ds.blob, 
        image: ds.image_url,
        encode: ds.encode,
        active: ds.active,
    }) )
}
