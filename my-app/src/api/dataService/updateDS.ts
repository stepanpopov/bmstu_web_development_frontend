import { DOMAIN, JWT_TOKEN_COOKIE, requestTime } from "../../consts.tsx";
import Cookies from "js-cookie";
import axios from "axios";

export interface CreateDataService {
    data_name: string,
    encode: boolean,
    blob: string,
}

interface RawCreateDSResp {
    data_id: number,
}

const configCreate = (ds: CreateDataService, token: string) => ({
    method: "post",
    url: `${DOMAIN}/dataService/`,
    timeout: requestTime,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    data: ds
})

export const fetchCreateDs = async (ds: CreateDataService): Promise<number> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";
    const resp = await axios<RawCreateDSResp>(configCreate(ds, accessToken))
    return resp.data.data_id
};

// ---------------------------------------------------------------------------------------------

const configDelete = (id: number, token: string) => ({
    method: "delete",
    url: `${DOMAIN}/dataService/${id}`,
    timeout: requestTime,
    headers: {
        Authorization: `Bearer ${token}`,
    },
})

export const fetchDeleteDs = async (id: number): Promise<void> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";
    await axios<CreateDataService>(configDelete(id, accessToken))
};

//------------------------------------------------------------------------------------------------

export interface UpdateDataService {
    data_id: number,
    data_name: string,
    encode: boolean,
    blob: string,
}

const configUpdate = (ds: UpdateDataService, token: string) => ({
    method: "put",
    url: `${DOMAIN}/dataService/`,
    timeout: requestTime,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    data: ds,
})

export const fetchUpdateDs = async (ds: UpdateDataService): Promise<void> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";
    await axios<UpdateDataService>(configUpdate(ds, accessToken))
};

// ------------------------------------------------------------------------------------------------

const configPic = (id: number, token: string, img: Blob) => {
    const data = new FormData()
    data.append('avatar', img)
    return {
        method: "post",
        url: `${DOMAIN}/dataService/${id}/image`,
        timeout: requestTime * 3,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data
    }
}

export const fetchPutPicDS = async (id: number, cover: Blob): Promise<void> => {
    const accessToken = Cookies.get(JWT_TOKEN_COOKIE) ?? "";
    await axios(configPic(id, accessToken, cover))
};

// ------------------------------------------------------------------------------------------------

