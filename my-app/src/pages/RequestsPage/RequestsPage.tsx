import {useLocation, useParams} from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import DataService from "../../models/dataService";
import { useEffect, useState } from 'react';
import { mainPage, navTitle } from '../../consts.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import RequestCard from '../../components/RequestCard/RequestCard.tsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Page, SetPage, SetPageTitleLink } from '../../models/common.ts';

import {useAppDispatch} from "../../store";
import { enqDeqReqListActions, useLoadingFilterReqs, useError, useReqsDSListByID, useDraft, filterReqs, useOtherReqList } from '../../store/encryptDecryptRequestList'
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
