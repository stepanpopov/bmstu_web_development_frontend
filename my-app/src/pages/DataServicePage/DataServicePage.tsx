import {useLocation, useParams} from 'react-router-dom';
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs.tsx";;
import { Container } from 'react-bootstrap';
import DataService from "../../models/dataService";
import { useEffect, useState } from 'react';
import { mainPage, navTitle } from '../../consts.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import DataServiceBigCard from '../../components/DataServiceBigCard/DataServiceBigCard.tsx';

import {useAppDispatch} from "../../store";
import { dataSericeActions, useDataServices, getDsByID } from '../../store/dataServiceList/index.ts'


const DataServicePage = () => {
    const location = useLocation()

    const {id} = useParams()
    // handle not convertable id
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getDsByID(id == undefined ? 0 : +id))
    }, [id])

    const dataService = 
    

    /*const fetchDS = async () => {
        const ds: DataService = await getDsByID(id == undefined ? 0 : +id)
        setDataService(ds)
        setLoading(false)
    }*/



    console.log(dataService)

    return (
        <Container>
            <Navbar title={navTitle} link='/'/>
            {!loading && <BreadCrumbs pages={[mainPage, {link: location.pathname, title: dataService!.name},]}></BreadCrumbs>}
            {!loading && <DataServiceBigCard ds={dataService!}></DataServiceBigCard>}
            <Footer />
        </Container>
    );
};

export default DataServicePage;
