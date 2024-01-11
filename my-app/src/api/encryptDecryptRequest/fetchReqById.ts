import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import EncryptDecryptRequest, { getStatusFromNumber } from "../../models/encryptDecryptRequest"
import Cookies from "js-cookie";
import { RawEncryptDecryptRequst, RawDataService } from '../models'
import DataService from "../../models/dataService";

interface RawResponse {
    encDecReq: RawEncryptDecryptRequst,
    dataServices: RawDataService[]
}

const config = (token: string, id: number) => ({
    method: "get",
    url: `${DOMAIN}/encryptDecryptRequest/${id}`,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    timeout: requestTime,  
})

export const fetchReqByID = async (id: number): Promise<[EncryptDecryptRequest, DataService[]]> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";

    const resp = await axios<RawResponse>(config(accessToken, id))
    const dsList: DataService[] = resp.data.dataServices.map((ds: RawDataService) => ({
        id: ds.data_id, 
        name: ds.data_name, 
        blob: ds.blob, 
        image: ds.image_url,
        encode: ds.encode,
        active: ds.active,
    }))

    const r = resp.data.encDecReq
    const req: EncryptDecryptRequest = {
        id: r.requestID,
        status: getStatusFromNumber(r.status),
        creationDate: r.creationDate,
        finishDate: (r.finishDate === null ? undefined : r.finishDate),
        formDate: (r.formDate === null ? undefined : r.formDate),
        moderator: (r.moderator === null ? undefined : r.moderator),
        creator: (r.creator === null ? undefined : r.creator),
    }

    return [req, dsList]
}
