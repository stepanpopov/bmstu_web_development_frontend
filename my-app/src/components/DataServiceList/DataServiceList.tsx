import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";
import DataService from "../../models/dataService.ts";
import { Container, Spinner } from "react-bootstrap"

import {useAppDispatch} from "../../store";
import { dataServiceListActions, useDataServices, useLoading, filterDataListByName } from '../../store/dataServiceList/index.ts'


import './DataServiceList.css'

interface DataServiceListProps {
    searchValue: string;
}

const DataServiceList = ({searchValue}: DataServiceListProps) => {
    const dispatch = useAppDispatch()
    const dataServices = useDataServices()
    const loading = useLoading()

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(filterDataListByName(searchValue))
    }, [searchValue])

    return (
        <Container className="cards">
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
 
            {!loading && dataServices.filter((ds) => (ds.active)).map((ds) => (
                <DataServiceCard 
                    ds={ds}
                    onClick={(id) => (navigate(`service/${id}`))}
                />
            ))}
        </Container>
    );
};

export default DataServiceList;
