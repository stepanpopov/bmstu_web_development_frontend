import { isAxiosError } from "axios";


export const axiousErrCheck = (err: any) => {
    if (isAxiosError(err)) {

        err.message = err.response?.data ?? err.message
    }

    return err
}

export const axiousErrResp = (err: any) => {
    if (isAxiosError(err)) {
        return err.response?.data.message ?? err.message
    }

    return err.message
}
