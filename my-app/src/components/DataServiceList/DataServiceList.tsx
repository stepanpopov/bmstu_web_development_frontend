import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import DataServiceCard from "../DataServiceCard/DataServiceCard.tsx";
import { Loader } from '../Loader/Loader.tsx'
import { Container } from "react-bootstrap"
import Button from "../Button/Button.tsx";

import { useAppDispatch } from "../../store";
import { useDataServices, useLoading, filterDataListByName, addToDraft, deleteDS } from '../../store/dataServiceList'


import './DataServiceList.css'
import { useUser } from "../../store/user";
import DataService from "../../models/dataService.ts";

interface DataServiceListProps {
    searchValue: string;
}

const DataServiceList = ({ searchValue }: DataServiceListProps) => {
    const dispatch = useAppDispatch()
    const dataServices = useDataServices()
    const loading = useLoading()
    const user = useUser()
    const isAuth = user ? true : false

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(filterDataListByName(searchValue))
    }, [searchValue, dispatch])

    const handleAddToDraft = (id: number) => () => dispatch(addToDraft(id))


    if (loading) {
        return <Loader />
    }

    //const moderatorEditHandler = (id: number) => (navigate(`service/${id}/`, { state: { title: } })
    //const moderatorRemoveHandler = 

    const handleRemove = (id: number) => () => dispatch(deleteDS(id))

    const userButton = (ds: DataService) => (
        <Button text={'Добавить в корзину'} onClick={handleAddToDraft(ds.id)} disabled={!isAuth} />
    )

    const moderatorButtons = (ds: DataService) => (
        <>
            {userButton(ds)}
            <Button text={'Редактировать'} onClick={() => (navigate(`service/${ds.id}/update`, { state: { title: ds.name } }))} />
            <Button text={'Удалить'} onClick={handleRemove(ds.id)} />
        </>
    )

    return (
        <Container className="cards">
            {dataServices.filter((ds) => (ds.active)).map((ds) => (
                <DataServiceCard
                    ds={ds}
                    onClick={(id) => (navigate(`service/${id}`, { state: { title: ds.name } }))}
                    key={ds.id}
                    childButton={
                        user?.role === 'moderator' ?
                            moderatorButtons(ds)
                            :
                            userButton(ds)
                    }
                />
            ))}
        </Container>
    );
};

export default DataServiceList;
