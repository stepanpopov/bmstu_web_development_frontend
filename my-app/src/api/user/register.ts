import { DOMAIN, requestTime } from "../../consts"
import axios from "axios";

const config = (login: string, password: string, is_moderator: boolean) => ({
    method: "post",
    url: `${DOMAIN}/auth/register`,
    data: {
        login,
        password,
        is_moderator,
    },
    timeout: requestTime,  
})

export const fetchRegister = async (login: string, password: string, is_moderator: boolean): Promise<void> => {
    await axios(config(login, password, is_moderator))
}
