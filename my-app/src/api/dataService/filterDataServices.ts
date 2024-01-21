import { DOMAIN, JWT_TOKEN_COOKIE, requestTime } from "../../consts"
import DataService from "../../models/dataService"
import { RawDataService } from "../models";
import axios from "axios";
import Cookies from 'js-cookie'

interface RawFilteringResponse {
    data_service: RawDataService[],
    draft_id: number,
}

const config = (search: string, token: string) => ({
    method: "get",
    url: `${DOMAIN}/dataService/?dataname=${search}`,
    timeout: requestTime * 3,
    headers: {
        Authorization: `Bearer ${token ?? ''}`,
    },
})

export interface FilterResponse {
    dsList: DataService[],
    draftId: number,
}

export const fetchDataListByName = async (search: string): Promise<FilterResponse> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";
    const resp = await axios<RawFilteringResponse>(config(search, accessToken))


    const dsList = resp.data.data_service.map((ds: RawDataService) => ({
        id: ds.data_id,
        name: ds.data_name,
        blob: ds.blob,
        image: ds.image_url,
        encode: ds.encode,
        active: ds.active,
    }))
    return {
        dsList,
        draftId: resp.data.draft_id,
    }
}
