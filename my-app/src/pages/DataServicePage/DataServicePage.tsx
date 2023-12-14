import {useLocation, useParams} from 'react-router-dom';
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import getDsByID from '../../modules/getDsById.ts';
import { Container } from 'react-bootstrap';
import DataServiceCard from '../../components/DataServiceCard/DataServiceCard.tsx';
import {DataService} from "../../models/models.ts";
import { useEffect, useState } from 'react';
import { dataServicesMock, mainPage } from '../../Consts.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx'
import Footer from '../../components/Footer/Footer.tsx';


const DataServicePage = () => {
    const {id} = useParams()
    const location = useLocation()

    const [dataService, setDataService] = useState<DataService>(dataServicesMock[0])

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
            <Navbar title='DATA SERVICE' link='/'/>
            <BreadCrumbs pages={[mainPage, {link: location.pathname, title: 'Data'},]}></BreadCrumbs>
            {!loading && <DataServiceCard ds={dataService!} onClick={() => null}></DataServiceCard>}
            <Footer />
        </Container>
    );
};

export default DataServicePage;
