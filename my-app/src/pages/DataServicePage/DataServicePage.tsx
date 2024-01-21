import { useLocation, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Loader } from '../../components/Loader/Loader.tsx'
import { useEffect } from 'react';
import DataServiceBigCard from '../../components/DataServiceBigCard/DataServiceBigCard.tsx';

import { useAppDispatch } from "../../store";
import { dataServiceActions, useDataService, useLoading, getDsByID } from '../../store/dataService/index.ts'
import { SetPageTitleLink } from '../../models/common.ts';

interface Props {
    setPage: SetPageTitleLink
}

const DataServicePage = ({ setPage }: Props) => {
    const location = useLocation()

    const { id } = useParams()
    // handle not convertable id
    const dispatch = useAppDispatch()



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
