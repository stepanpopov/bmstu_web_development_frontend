import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";
import { Loader } from '../Loader/Loader.tsx'
import { Container } from "react-bootstrap"
import Button from "../Button/Button.tsx";

import { useAppDispatch } from "../../store";
import { useDataServices, useLoading, filterDataListByName, addToDraft } from '../../store/dataServiceList'


import './DataServiceList.css'
import { useUser } from "../../store/user";

interface DataServiceListProps {
    searchValue: string;
}

const DataServiceList = ({ searchValue }: DataServiceListProps) => {
    const dispatch = useAppDispatch()
    const dataServices = useDataServices()
    const loading = useLoading()
    const isAuth = useUser() ? true : false

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(filterDataListByName(searchValue))
    }, [searchValue, dispatch])

    const handleAddToDraft = (id: number) => () => dispatch(addToDraft(id))


    if (loading) {
        return <Loader />
    }

    return (
        <Container className="cards">
            {dataServices.filter((ds) => (ds.active)).map((ds) => (
                <DataServiceCard
                    ds={ds}
                    onClick={(id) => (navigate(`service/${id}`, { state: { title: ds.name } }))}
                    key={ds.id}
                    childButton={<Button text={'Добавить в корзину'} onClick={handleAddToDraft(ds.id)} disabled={!isAuth} />}
                />
            ))}
        </Container>
    );
};

export default DataServiceList;
