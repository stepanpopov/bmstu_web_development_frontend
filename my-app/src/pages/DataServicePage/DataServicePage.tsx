import {useLocation, useParams} from 'react-router-dom';
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import getDsByID from '../../modules/getDsById.ts';
import { Container } from 'react-bootstrap';
import DataServiceCard from '../../components/DataServiceCard/DataServiceCard.tsx';
import {DataService} from "../../models/models.ts";
import { useEffect, useState } from 'react';
import { dataServicesMock, mainPage, navTitle } from '../../Consts.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx'
import Footer from '../../components/Footer/Footer.tsx';
import DataServiceBigCard from '../../components/DataServiceBigCard/DataServiceBigCard.tsx';


const DataServicePage = () => {
    const {id} = useParams()
    const location = useLocation()

    const [dataService, setDataService] = useState<DataService>()

    const [loading, setLoading] = useState(true)

    const fetchDS = async () => {
        const ds: DataService = await getDsByID(id == undefined ? 0 : +id)
        setDataService(ds)
        setLoading(false)
    }

    useEffect(() => {
        fetchDS()
    }, [id])

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
