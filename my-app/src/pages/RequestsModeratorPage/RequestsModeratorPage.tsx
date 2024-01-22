import { Container } from 'react-bootstrap';
import { useEffect } from 'react';
import RequestsTable from '../../components/RequestsTable/RequestsTable.tsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SetPage } from '../../models/common.ts';

import { useAppDispatch } from "../../store";
import { enqDeqReqListActions, useError, filterReqs } from '../../store/encryptDecryptRequestList'
import RequestsInputFilter from '../../components/RequestsInputFilter/RequestsInputFilter.tsx';
import { useOtherReqList, useReqFilter } from '../../store/encryptDecryptRequestList/selectors.ts';

interface Props {
    setPage: SetPage
}

const RequestsModeratorPage = ({ setPage }: Props) => {
    const POLLING_INTERVAL = 5000;

    const dispatch = useAppDispatch()

    const filters = useReqFilter()

    useEffect(() => { setPage() }, [])

    useEffect(() => { dispatch(filterReqs(filters)) }, [])

    useEffect(() => {
        const intervalID = setInterval(() => {
            dispatch(filterReqs(filters)) // !
        }, POLLING_INTERVAL)

        return () => clearInterval(intervalID)
    }, [filters])

    // const draftReq = useDraft()
    const reqs = useOtherReqList()
    // const reqsWithDraft = draftReq ? [draftReq, ...otherReqs] : otherReqs

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
            <RequestsInputFilter isModerator={true} />
            {reqs.length === 0 || reqs === undefined ?
                <h3>Нет заявок</h3> :
                <RequestsTable requests={reqs} isModerator={true} />
            }
        </Container>
    );
};

export default RequestsModeratorPage;
