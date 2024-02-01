import { useSelector } from "react-redux";
import { RootState } from "../types";
import EncryptDecryptRequest from "../../models/encryptDecryptRequest";
import { Req, State } from "./slice"
import DataService from "../../models/dataService";
import { memoize } from 'proxy-memoize';

const getDraftID = (state: State) => (
    (Object.entries(state.reqs)).findIndex(([_, req]) => (req.req.status === 'draft'))
)

const dsListByIDs = (state: RootState, ids: number[]): DataService[] => {
    const dsList: DataService[] = []

    state.enqDeqReqList.dsList.forEach((ds) => {
        if (ids.includes(ds.id)) {
            dsList.push(ds)
        }
    })

    return dsList
}

export const useReqList = (): EncryptDecryptRequest[] => useSelector(memoize(({ enqDeqReqList: { reqs } }: RootState) =>
    (Object.entries(reqs).map(([_, req]) => req.req)))
)

export const useError = () => useSelector((state: RootState) =>
    (state.enqDeqReqList.error)
)

export const useReqWithDSByID = (id: number) => useSelector(memoize((state: RootState) => {
    let req: Req | null = state.enqDeqReqList.reqs[id]

    if (!req) {
        return { request: null, dsList: [] }
        // return [null, []]
    }

    return { request: req.req, dsList: dsListByIDs(state, req.reqDs) }
    // return [req.req, dsListByIDs(state, req.reqDs)]
}))

export const useReqsDSListByID = (id: number) => useSelector(memoize((state: RootState) => {
    let req: Req | undefined = state.enqDeqReqList.reqs[id]

    if (!req) {
        return []
    }

    return dsListByIDs(state, req.reqDs)
}))

export const useDraftWithDS = () => useSelector((state: RootState) => {
    const draft = state.enqDeqReqList.reqs[getDraftID(state.enqDeqReqList)]

    if (!draft) {
        return [undefined, []]
    }

    return [draft.req, dsListByIDs(state, draft.reqDs)]
})

export const useDraft = () => useSelector(memoize(({ enqDeqReqList }: RootState) => (
    enqDeqReqList.reqs[getDraftID(enqDeqReqList)]?.req
)))

export const useDraftID = () => useSelector(({ enqDeqReqList }: RootState) => {
   const draftID = getDraftID(enqDeqReqList);
    return (draftID === -1 ? null : draftID)
})

export const useLoadingFilterReqs = () => useSelector((state: RootState) => (state.enqDeqReqList.loadingFilterReqs))

export const useLoading = () => useSelector((state: RootState) => (state.enqDeqReqList.loading))

export const useDraftActive = () =>
    useSelector((state: RootState) => getDraftID(state.enqDeqReqList) !== -1)

export const useRequestsActive = () =>
    useSelector((state: RootState) => Object.entries(state.enqDeqReqList.reqs).length !== 0)

export const useReqFilter = () => useSelector((state: RootState) => state.enqDeqReqList.filter)

export const useOtherReqListByCreator = (creator: string): EncryptDecryptRequest[] => useSelector(memoize(({ enqDeqReqList: { reqs } }: RootState) =>
    (Object.entries(reqs).map(([_, req]) => req.req)).filter((req: EncryptDecryptRequest) => req.creator?.startsWith(creator)))
)
