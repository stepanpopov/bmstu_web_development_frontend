import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts";
import Cookies from "js-cookie";
import axios, {AxiosRequestConfig} from "axios";

const config = (token: string): AxiosRequestConfig => ({
    method: "get",
    url: `${DOMAIN}/auth/checkCookies`,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    timeout: requestTime,
    validateStatus: (status: number) => (status < 300 || status === 403)  
})

export const fetchCheckAuth = async (): Promise<boolean> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";
    const resp = await axios(config(accessToken))
    if (resp.status === 403) {
        return false
    }
    return true
}
