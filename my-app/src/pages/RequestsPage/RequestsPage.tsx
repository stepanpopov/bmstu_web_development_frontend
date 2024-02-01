import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import RequestsTable from '../../components/RequestsTable/RequestsTable.tsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SetPage } from '../../models/common.ts';

import { useAppDispatch } from "../../store";
import { enqDeqReqListActions, useError, useDraft, filterReqs, useReqList } from '../../store/encryptDecryptRequestList'
import RequestsInputFilter from '../../components/RequestsInputFilter/RequestsInputFilter.tsx';
import { useReqFilter } from '../../store/encryptDecryptRequestList/selectors.ts';

interface Props {
    setPage: SetPage
}

const RequestsPage = ({ setPage }: Props) => {

    const dispatch = useAppDispatch()

    const filters = useReqFilter()

    useEffect(() => {
        setPage()
        dispatch(filterReqs(filters))
    }, [])


    // const draftReq = useDraft()
    const reqs = useReqList()

    // const isStatusForDraft = (filters.status === 'draft' || filters.status === undefined)
    // const reqsWithDraft = (draftReq && isStatusForDraft) ? [draftReq, ...reqs] : reqs

    // const loading = useLoadingFilterReqs()
    const error = useError()

    useEffect(() => {
        if (error) {
            toast.warn(error)
            dispatch(enqDeqReqListActions.resetError())
        }
    }, [error])


    return (
        <Container>
            <ToastContainer position="top-center" newestOnTop={false} />
            <RequestsInputFilter />
            {reqs.length === 0 || reqs === undefined ?
                <h3>Нет заявок</h3> :
                <RequestsTable requests={reqs} />
            }
        </Container>
    );
};

export default RequestsPage;
