import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import EncryptDecryptRequest, { getStatusFromNumber } from "../../models/encryptDecryptRequest"
import Cookies from "js-cookie";
import { RawEncryptDecryptRequst } from '../models'

type RawResponse = RawEncryptDecryptRequst[]

const config = (token: string, status: string, startDate: string, endDate: string) => ({
    method: "get",
    url: `${DOMAIN}/encryptDecryptRequest/filter?status=${status}&start_date=${startDate}&end_date=${endDate}`,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    timeout: requestTime,  
})

export const fetchFilterReqs = async (status: string, startDate: string, endDate: string): Promise<EncryptDecryptRequest[]> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";

    const resp = await axios<RawResponse>(config(accessToken, status, startDate, endDate))
    return resp.data.map((r: RawEncryptDecryptRequst) => ({
        id: r.requestID,
        status: getStatusFromNumber(r.status),
        creationDate: r.creationDate,
        finishDate: (r.finishDate === null ? undefined : r.finishDate),
        formDate: (r.formDate === null ? undefined : r.formDate),
        moderator: (r.moderator === null ? undefined : r.moderator),
        creator: (r.creator === null ? undefined : r.creator),
    }))
}
