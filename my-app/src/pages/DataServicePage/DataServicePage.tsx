import {useLocation, useParams} from 'react-router-dom';
import { Container} from 'react-bootstrap';
import { Loader } from '../../components/Loader/Loader.tsx'
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

    useEffect(() => {
        dispatch(dataServiceActions.setLoading())
        dispatch(getDsByID(id == undefined ? 0 : +id))
    }, [id])

    const dataService = useDataService()
    const loading = useLoading()

    useEffect(() => {
        if (!loading) {
            setPage(location.pathname, location.state.title)
        }
    }, [loading])

    return (
        <Container>
            {loading && <Loader />}
            {!loading && <DataServiceBigCard ds={dataService!}></DataServiceBigCard>}
        </Container>
    );
};

export default DataServicePage;
