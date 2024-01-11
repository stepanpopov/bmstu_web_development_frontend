import {useLocation, useParams} from 'react-router-dom';
import { Container} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner'
import DataService from "../../models/dataService";
import { useEffect, useState } from 'react';
import { mainPage, navTitle } from '../../consts.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import DataServiceBigCard from '../../components/DataServiceBigCard/DataServiceBigCard.tsx';

import {useAppDispatch} from "../../store";
import { dataServiceActions, useDataService, useLoading, getDsByID } from '../../store/dataService/index.ts'
import { Page, SetPage, SetPageTitleLink } from '../../models/common.ts';

interface Props {
    setPage: SetPageTitleLink
}

const DataServicePage = ({ setPage }: Props) => {
    const location = useLocation()

    const {id} = useParams()
    // handle not convertable id
    const dispatch = useAppDispatch()

    console.log(id)

    const dataService = useDataService()
    const loading = useLoading()

    useEffect(() => {
        dispatch(getDsByID(id == undefined ? 0 : +id))
    }, [id])

    useEffect(() => {
        if (!loading) {
            setPage(location.pathname, dataService!.name)
        }
    }, [loading])

    console.log(loading)
    console.log(dataService)

    return (
        <Container>
            {loading && <Spinner animation="border" variant="success" />}
            {!loading && <DataServiceBigCard ds={dataService!}></DataServiceBigCard>}
            <Footer />
        </Container>
    );
};

export default DataServicePage;
