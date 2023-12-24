import DataServiceList from "../../components/DataServiceList/DataServiceList.tsx";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import { Container } from 'react-bootstrap';
import { mainPage, navTitle } from '../../Consts.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx'
import InputFilter from '../../components/InputFilter/InputFilter.tsx';
import { useState } from 'react';
import Footer from '../../components/Footer/Footer.tsx';

const DataServiceListPage = () => {
    
    const [searchValue, setSearchValue] = useState('')

    return (
        <Container>
            <Navbar title={navTitle} link='/rip_frontend'/>
            <BreadCrumbs pages={[mainPage]} />
            <Container>
                <InputFilter searchValue={searchValue} setSearchValue={setSearchValue} />
                <DataServiceList searchValue={searchValue} />
            </Container>
            <Footer />
        </Container>
    );
};

export default DataServiceListPage;
