import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import EncryptDecryptRequest, { getStatusFromNumber } from "../../models/encryptDecryptRequest"
import Cookies from "js-cookie";
import { RawEncryptDecryptRequst } from '../models'

type RawResponse = RawEncryptDecryptRequst[]

const makeFilterUrl = (status: string, startDate: string, endDate: string) => {

    const url = `${DOMAIN}/encryptDecryptRequest/filter`;

    const params: string[] = []
    if (status != "") {
        params.push(`start_date=${startDate}`)
    }
    if (startDate != "") {
        params.push(`start_date=${startDate}`)
    }
    if (endDate != "") {
        params.push(`end_date=${endDate}`)
    }

    for (let i = 0; i < params.length; i++) {
        if (i == 0) {
            url.concat('?')
        } else {
            url.concat('&')
        }
        url.concat(params[i])
    }

    return url
}

const config = (token: string, status: string, startDate: string, endDate: string) => ({
    method: "get",
    url: makeFilterUrl(status, startDate, endDate),
    headers: {
        Authorization: `Bearer ${token}`,
    },
    timeout: requestTime * 2,  
})

export interface FilterReqArgs {
    status?: string
    startDate?: string
    endDate?: string
}

export const fetchFilterReqs = async ({status, startDate, endDate} : FilterReqArgs): Promise<EncryptDecryptRequest[]> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";

    status = status ?? ""
    startDate = startDate ?? ""
    endDate = endDate ?? ""

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
