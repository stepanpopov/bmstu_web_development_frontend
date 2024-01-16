import { DOMAIN, requestTime } from "../../consts.tsx";
import DataService from "../../models/dataService"
import { RawDataService } from "../models";
import axios from "axios";

const config = (id: number) => ({
    method: "get",
    url: `${DOMAIN}/dataService/${id}`,
    timeout: requestTime * 3,  
})

export const fetchDsByID = async (id: number): Promise<DataService> => {
    const resp = await axios<RawDataService>(config(id))

    const ds: DataService = {
        id: resp.data.data_id, 
        name: resp.data.data_name, 
        blob: resp.data.blob, 
        image: resp.data.image_url,
        encode: resp.data.encode,
        active: resp.data.active,
    }

    return ds
};
