import { DOMAIN, requestTime, JWT_TOKEN_COOKIE } from "../../consts"
import axios from "axios";
import Cookies from "js-cookie";

type Action = "finish" | "reject"

export interface UpdateModeratorReq {
    id: number,
    action: Action
}

const config = (action: string, id: number, token: string) => ({
    method: "put",
    url: `${DOMAIN}/encryptDecryptRequest/update_moderator/${id}`,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    data: {
        action,
    },
    timeout: requestTime,
})

export const fetchUpdateModeratorReq = async (req: UpdateModeratorReq): Promise<void> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";
    await axios(config(req.action, req.id, accessToken))
}
