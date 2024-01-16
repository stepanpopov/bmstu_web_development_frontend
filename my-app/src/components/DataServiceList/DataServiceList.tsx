import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";
import { Loader } from '../Loader/Loader.tsx'
import DataService from "../../models/dataService.ts";
import { Container, Spinner } from "react-bootstrap"

import {useAppDispatch} from "../../store";
import { dataServiceListActions, useDataServices, useLoading, filterDataListByName } from '../../store/dataServiceList'


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

    if (loading) {
        return <Loader />
    }

    return (
        <Container className="cards">
            {dataServices.filter((ds) => (ds.active)).map((ds) => (
                <DataServiceCard 
                    ds={ds}
                    onClick={(id) => (navigate(`service/${id}`, {state: {title: ds.name}}))}
                    draftButtonExists
                    key={ds.id}
                />
            ))}
        </Container>
    );
};

export default DataServiceList;
