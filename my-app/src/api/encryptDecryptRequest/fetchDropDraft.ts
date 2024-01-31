import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import Cookies from 'js-cookie'

const config = (token: string, id: number) => ({
    method: "delete",
    url: `${DOMAIN}/encryptDecryptRequest/${id}`,
    headers: {
        Authorization: `Bearer ${token ?? ''}`,
    },
    timeout: requestTime, 
})

export const fetchDropDraft = async (id: number): Promise<void> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";

    await axios(config(accessToken, id))
}
