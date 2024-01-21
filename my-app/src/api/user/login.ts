import { DOMAIN, requestTime } from "../../consts"
import axios from "axios";

interface RawResponse {
    expires_in: number,
    access_token: string,
    token_type: "Bearer",
    is_moderator: boolean,
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

export interface LoginResponse {
    accessToken: string,
    isModerator: boolean,
}

export const fetchLogin = async (login: string, password: string): Promise<LoginResponse> => {
    const resp = await axios<RawResponse>(config(login, password))
    return {
        accessToken: resp.data.access_token,
        isModerator: resp.data.is_moderator,
    }
}
