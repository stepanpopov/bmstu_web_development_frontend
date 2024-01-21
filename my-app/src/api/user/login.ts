import { DOMAIN, requestTime } from "../../consts"
import axios from "axios";

interface RawResponse {
    expires_in: number,
    access_token: string,
    token_type: "Bearer",
}

const config = (login: string, password: string) => ({
    method: "post",
    url: `${DOMAIN}/auth/login`,
    data: {
        login,
        password
    },
    timeout: requestTime,
})

export const fetchLogin = async (login: string, password: string): Promise<string> => {
    const resp = await axios<RawResponse>(config(login, password))
    return resp.data.access_token
}
