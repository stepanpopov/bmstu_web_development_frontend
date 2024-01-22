import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import Cookies from 'js-cookie'
import { Encoding } from "../../models/encryptDecryptRequest";

const config = (token: string, id: number, encType: string) => ({
    method: "put",
    url: `${DOMAIN}/encryptDecryptRequest/form/${id}`,
    headers: {
        Authorization: `Bearer ${token ?? ''}`,
    },
    timeout: requestTime,
    data: {
        encoding_type: encType
    }  
})

export const fetchFormDraft = async (id: number, encType: Encoding): Promise<void> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";

    await axios(config(accessToken, id, encType))
}
