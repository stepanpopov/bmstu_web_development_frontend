import DataServiceList from "../../components/DataServiceList/DataServiceList.tsx";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import { Container } from 'react-bootstrap';
import { mainPage, navTitle } from '../../consts.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx'
import InputFilter from '../../components/InputFilter/InputFilter.tsx';
import { useEffect, useState } from 'react';
import { SetPage } from "../../models/common.ts";

interface Props {
    setPage: SetPage
}

const DataServiceListPage = ({setPage}: Props) => {
    useEffect(() => {
        setPage()
    }, [])
    
    const [searchValue, setSearchValue] = useState('')

    return (
        <Container>
            <Container>
                <InputFilter searchValue={searchValue} setSearchValue={setSearchValue} />
                <DataServiceList searchValue={searchValue} />
            </Container>
        </Container>
    );
};

export default DataServiceListPage;
