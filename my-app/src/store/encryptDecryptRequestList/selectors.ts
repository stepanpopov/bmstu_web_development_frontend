import { useSelector } from "react-redux";
import { RootState } from "../types";
import EncryptDecryptRequest from "../../models/encryptDecryptRequest";
import {Req} from "./slice"
import DataService from "../../models/dataService";

const dsListByIDs = (state: RootState, ids: Set<number>): DataService[] => {
    const dsList: DataService[] = []

    state.enqDeqReqList.dsList.forEach((ds) => {
        if (ids.has(ds.id)) {
            dsList.push(ds)
        }
    })

    return dsList
}

export const useOtherReqList= (): EncryptDecryptRequest[]  => useSelector((state: RootState) => 
    (Object.entries(state.enqDeqReqList.otherReqs).map(([_, req]) => req.req))
)

export const useReqListWithoutDraft= () => useSelector((state: RootState) => 
    (
        Object.entries(state.enqDeqReqList.otherReqs)
        .map(([_, req]) => req)
        .filter((req: EncryptDecryptRequest) => (req.status != "draft"))
    )
)

export const useError = () => useSelector((state: RootState) => 
    (state.enqDeqReqList.error)
)

export const useReqWithDSByID = (id: number) => useSelector((state: RootState) => {
    let req: Req | undefined = state.enqDeqReqList.otherReqs[id]
    if (!req && state.enqDeqReqList.draft) {
        req = (
            state.enqDeqReqList.draft.req.id === id ? 
                    state.enqDeqReqList.draft : 
                    undefined
        );
    }

    if (!req) {
        return [undefined, []]
    }

    const dsList = dsListByIDs(state, req.reqDs)

    return [req.req, dsList]
})

export const useReqsDSListByID = (id: number) => useSelector((state: RootState) => {
    let req: Req | undefined = state.enqDeqReqList.otherReqs[id]
    if (!req && state.enqDeqReqList.draft) {
        req = (
            state.enqDeqReqList.draft.req.id === id ? 
                    state.enqDeqReqList.draft : 
                    undefined
        );
    }

    if (!req) {
        return []
    }

    const dsList: DataService[] = dsListByIDs(state, req.reqDs)

    return dsList
})

export const useDraftWithDS = () => useSelector((state: RootState) => {
    const draft = state.enqDeqReqList.draft;

    if (!draft) {
        return [undefined, []]
    }

    return [draft.req, dsListByIDs(state, draft.reqDs)]
})

export const useDraft = () => useSelector((state: RootState) => (
    state.enqDeqReqList.draft?.req
))

export const useLoading = () => useSelector((state: RootState) => (state.enqDeqReqList.loading))

export const useDraftActive = () => 
    useSelector((state: RootState) => state.enqDeqReqList.draftID !== null)
