import { useSelector } from "react-redux";
import { RootState } from "../types";
import EncryptDecryptRequest from "../../models/encryptDecryptRequest";
import {Req} from "./slice"
import DataService from "../../models/dataService";
import { memoize } from 'proxy-memoize';

const dsListByIDs = (state: RootState, ids: number[]): DataService[] => {
    const dsList: DataService[] = []

    state.enqDeqReqList.dsList.forEach((ds) => {
        if (ids.includes(ds.id)) {
            dsList.push(ds)
        }
    })

    return dsList
}

export const useOtherReqList= (): EncryptDecryptRequest[]  => useSelector(memoize(( { enqDeqReqList: {otherReqs}}: RootState ) => 
    (Object.entries(otherReqs).map(([_, req]) => req.req)))
)

export const useError = () => useSelector((state: RootState) => 
    (state.enqDeqReqList.error)
)

export const useReqWithDSByID = (id: number) => useSelector(memoize((state: RootState) => {
    let req: Req | null = state.enqDeqReqList.otherReqs[id]
    if (!req && state.enqDeqReqList.draft) {
        req = (
            state.enqDeqReqList.draft.req.id === id ? 
                    state.enqDeqReqList.draft : 
                    null
        );
    }

    if (!req) {
        return {request: null, dsList: []}
        // return [null, []]
    }

    return {request: req.req, dsList: dsListByIDs(state, req.reqDs)}
    // return [req.req, dsListByIDs(state, req.reqDs)]
}))

export const useReqsDSListByID = (id: number) => useSelector(memoize((state: RootState) => {
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

    return dsListByIDs(state, req.reqDs)
}))

export const useDraftWithDS = () => useSelector((state: RootState) => {
    const draft = state.enqDeqReqList.draft;

    if (!draft) {
        return [undefined, []]
    }

    return [draft.req, dsListByIDs(state, draft.reqDs)]
})

export const useDraft = () => useSelector(memoize(({ enqDeqReqList: {draft}}: RootState) => (
    draft?.req
)))

export const useLoadingFilterReqs = () => useSelector((state: RootState) => (state.enqDeqReqList.loadingFilterReqs))

export const useLoading = () => useSelector((state: RootState) => (state.enqDeqReqList.loading))

export const useDraftActive = () => 
    useSelector((state: RootState) => state.enqDeqReqList.draftID !== null)

export const useRequestsActive = () => 
    useSelector((state:RootState) => state.enqDeqReqList.draftID || Object.entries(state.enqDeqReqList.otherReqs).length !== 0)
