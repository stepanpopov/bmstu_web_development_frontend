import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import EncryptDecryptRequest, { Status, getEncodingFromString, getStatusFromNumber } from "../../models/encryptDecryptRequest"
import Cookies from "js-cookie";
import { RawEncryptDecryptRequst } from '../models'

type RawResponse = RawEncryptDecryptRequst[]

const makeFilterUrl = (status: string, startDate: string, endDate: string) => {
    console.log('makeFilterUrl', status, startDate, endDate)

    let url = `${DOMAIN}/encryptDecryptRequest/filter`;

    const params: string[] = []
    if (status != "") {
        params.push(`status=${status}`)
    }
    if (startDate != "") {
        params.push(`start_date=${startDate}`)
    }
    if (endDate != "") {
        params.push(`end_date=${endDate}`)
    }
    console.log('params', params)

    for (let i = 0; i < params.length; i++) {
        if (i === 0) {
            url = url.concat('?')
        } else {
            url = url.concat('&')
        }
        url = url.concat(params[i])
    }

    console.log('url', url)
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
    status?: Status
    startDate?: string
    endDate?: string
}

export const fetchFilterReqs = async ({ status, startDate, endDate }: FilterReqArgs): Promise<EncryptDecryptRequest[]> => {
    console.log('fetchFilterReqs', status, startDate, endDate)

    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";

    startDate = startDate ?? ""
    endDate = endDate ?? ""

    const resp = await axios<RawResponse>(config(accessToken, status ?? "", startDate, endDate))
    const req: EncryptDecryptRequest[] = resp.data.map((r: RawEncryptDecryptRequst) => ({
        id: r.RequestID,
        status: getStatusFromNumber(r.Status),
        creationDate: new Date(r.CreationDate).getTime(),
        finishDate: (r.FinishDate === null ? undefined : new Date(r.FinishDate).getTime()),
        formDate: (r.FormDate === null ? undefined : new Date(r.FormDate).getTime()),
        moderator: (r.Moderator === null ? undefined : r.Moderator),
        creator: (r.Creator === null ? undefined : r.Creator),
        encoding: (r.EncodingType === null ? undefined : getEncodingFromString(r.EncodingType)),
        resultCounter: (r.ResultCounter === null ? undefined : r.ResultCounter)
    }))
    return req
}
