import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import RequestsTable from '../../components/RequestsTable/RequestsTable.tsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SetPage } from '../../models/common.ts';

import { useAppDispatch } from "../../store";
import { enqDeqReqListActions, useError, useDraft, filterReqs, useOtherReqList } from '../../store/encryptDecryptRequestList'
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

    const draftReq = useDraft()
    const otherReqs = useOtherReqList()
    const reqsWithDraft = draftReq ? [draftReq, ...otherReqs] : otherReqs

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
            {reqsWithDraft.length === 0 || reqsWithDraft === undefined ?
                <h3>Нет заявок</h3> :
                <RequestsTable requests={reqsWithDraft} />
            }
        </Container>
    );
};

export default RequestsPage;
