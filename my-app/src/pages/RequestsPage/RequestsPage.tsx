import { Container} from 'react-bootstrap';
import { useEffect } from 'react';
import RequestCard from '../../components/RequestCard/RequestCard.tsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SetPage } from '../../models/common.ts';

import {useAppDispatch} from "../../store";
import { enqDeqReqListActions, useLoadingFilterReqs, useError, useDraft, filterReqs, useOtherReqList } from '../../store/encryptDecryptRequestList'
import { Loader } from '../../components/Loader/Loader.tsx';

interface Props {
    setPage: SetPage
}

const RequestsPage = ({ setPage }: Props) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        setPage()
        dispatch(filterReqs({}))
        console.log('filterReqs called')
    }, [])

    const draftReq = useDraft()
    const otherReqs = useOtherReqList()
    const loading = useLoadingFilterReqs()
    const error = useError()

   

    useEffect(() => {
        console.log('error:', error)
        if (error) {
            toast.warn(error)
            dispatch(enqDeqReqListActions.resetError())
        }
    }, [error] )

    console.log('rendering requests page loader')
    if (loading) {
        return <Loader/>
    }

    console.log('rendering requests page')
    return (
        <Container>
            <ToastContainer position="top-center" newestOnTop={false} />
            { draftReq && <RequestCard key={draftReq.id} requestID={draftReq.id} /> }
            {
                otherReqs.map((req) => (
                    <RequestCard key={req.id} requestID={req.id} />
                ))
            }
        </Container>
    );
};

export default RequestsPage;
