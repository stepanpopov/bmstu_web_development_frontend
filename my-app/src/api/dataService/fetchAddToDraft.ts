import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import Cookies from 'js-cookie'

interface RawDraftResponse {
    draft_id: number,
}

const config = (token: string, id: number) => ({
    method: "post",
    url: `${DOMAIN}/dataService/draft/${id}`,
    headers: {
        Authorization: `Bearer ${token ?? ''}`,
    },
    timeout: requestTime,  
})

export const fetchAddToDraft = async (id: number): Promise<number> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";

    const resp = await axios<RawDraftResponse>(config(accessToken, id))
    return resp.data.draft_id
}
