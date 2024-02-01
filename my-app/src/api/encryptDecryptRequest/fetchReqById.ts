import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import EncryptDecryptRequest, { getEncodingFromString, getStatusFromNumber } from "../../models/encryptDecryptRequest"
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
    const dsList: DataService[] = resp.data.dataServices?.map((ds: RawDataService) => ({
        id: ds.data_id,
        name: ds.data_name,
        blob: ds.blob,
        image: ds.image_url,
        encode: ds.encode,
        active: ds.active,
        result: (ds.result === null ? undefined : ds.result),
        success: (ds.success === null ? undefined : ds.success)
    })) ?? [];

    const r = resp.data.encDecReq
    const req: EncryptDecryptRequest = {
        id: r.RequestID,
        status: getStatusFromNumber(r.Status),
        creationDate: new Date(r.CreationDate).getTime(),
        finishDate: (r.FinishDate === null ? undefined : new Date(r.FinishDate).getTime()),
        formDate: (r.FormDate === null ? undefined : new Date(r.FormDate).getTime()),
        moderator: (r.Moderator === null ? undefined : r.Moderator),
        creator: (r.Creator === null ? undefined : r.Creator),
        encoding: (r.EncodingType === null ? undefined : getEncodingFromString(r.EncodingType)),
    }

    return [req, dsList]
}
