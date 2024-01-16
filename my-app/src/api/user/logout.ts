import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts";
import Cookies from "js-cookie";
import axios from "axios";

const config = (token: string) => ({
    method: "get",
    url: `${DOMAIN}/auth/logout`,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    timeout: requestTime,  
})

export const fetchLogout = async (): Promise<void> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";
    await axios(config(accessToken))
}
